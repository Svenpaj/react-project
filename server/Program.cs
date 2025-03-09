using Npgsql;
using server;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});


var app = builder.Build();
app.UseSession();

Database database = new Database();
NpgsqlDataSource db = database.Connection();

app.MapGet("/api", () => Results.Ok("Hello World!"));
app.MapGet("/api/set-session", (HttpContext context) =>
{
    if (context.Session.GetString("UserRole") == null)
    {
        context.Session.SetString("UserRole", "guest");
    }
});
app.MapGet("/api/products", GetProducts);
app.MapGet("/api/verify-session", (Func<HttpContext, Task<IResult>>)verifySession);
app.MapPost("/api/login", LoginUser);
app.MapDelete("/api/logout", (Func<HttpContext, Task<IResult>>)LogoutUser);
app.MapGet("/api/issues", (Func<HttpContext, Task<IResult>>)GetIssues);
app.MapPost("/api/issues", CreateIssue);
app.MapGet("/api/companies", GetCompanies);
app.MapGet("/api/chat/{chatToken}", GetMessages);
app.MapPost("/api/chat", PostMessage);

async Task<IResult> GetProducts()
{
    var products = new List<Product>();
    await using var cmd = db.CreateCommand("SELECT * FROM productsWithCategory");
    await using var reader = await cmd.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        products.Add(new Product(
            reader.GetInt32(0),
            reader.GetString(1),
            reader.GetDouble(2),
            reader.GetString(3),
            reader.GetInt32(4),
            reader.GetString(5),
            reader.GetString(6)
        ));
    }
    return Results.Ok(products);
}

async Task<IResult> verifySession(HttpContext context)
{
    try
    {
        if (context.Session.GetString("UserRole") == null)
        {
            context.Session.SetString("UserRole", "guest");
        }
        if (context.Session.GetString("UserRole") == "guest")
        {
            var guest = new UserView(0, "", "", "", "", "", "guest");
            return Results.Ok(guest);
        }
        var userId = context.Session.GetString("UserId");

        if (userId == null)
        {
            return Results.Unauthorized();
        }

        // Fetch fresh user data from database
        await using var cmd = db.CreateCommand("SELECT * FROM user_view WHERE id = $1");
        cmd.Parameters.AddWithValue(int.Parse(userId));
        await using var reader = await cmd.ExecuteReaderAsync();

        if (await reader.ReadAsync())
        {
            var user = new UserView(
                reader.GetInt32(0),
                reader.GetString(1),
                reader.GetString(2),
                reader.GetString(3),
                reader.GetString(4),
                reader.GetString(5),
                reader.GetString(6)
            );
            if (user.Email != context.Session.GetString("UserEmail"))
            {
                return Results.Unauthorized();
            }
            return Results.Ok(user);
        }

        // If user not found in database, clear invalid session
        context.Session.Clear();
        return Results.Unauthorized();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Session verification failed: {ex.Message}");
        return Results.StatusCode(500);
    }
}

async Task<IResult> LoginUser(HttpContext httpContext, UserRequest userRequest)
{
    Console.WriteLine("/api/login has been called");
    await using var cmd = db.CreateCommand("SELECT * FROM user_view WHERE email = $1 AND password = $2");
    cmd.Parameters.AddWithValue(userRequest.Email);
    cmd.Parameters.AddWithValue(userRequest.Password);
    Console.WriteLine(userRequest.Email);
    Console.WriteLine(userRequest.Password);
    await using var reader = await cmd.ExecuteReaderAsync();

    if (await reader.ReadAsync())
    {
        var user = new UserView(
            reader.GetInt32(0),
            reader.GetString(1),
            reader.GetString(2),
            reader.GetString(3),
            reader.GetString(4),
            reader.GetString(5),
            reader.GetString(6)
        );

        if (httpContext.Session.GetString("UserId") != null)
        {
            return Results.BadRequest("User is already logged in");
        }

        // Store user information in session
        httpContext.Session.SetString("UserId", user.Id.ToString());
        httpContext.Session.SetString("UserName", user.Firstname + " " + user.Lastname);
        httpContext.Session.SetString("UserEmail", user.Email);
        httpContext.Session.SetString("UserRole", user.Role.ToString());
        httpContext.Session.SetString("UserCompany", user.Company.ToString());
        Console.WriteLine("User has been logged in");
        Console.WriteLine(httpContext.Session.GetString("UserId"));
        Console.WriteLine(httpContext.Session.GetString("UserName"));
        Console.WriteLine(httpContext.Session.GetString("UserEmail"));
        Console.WriteLine(httpContext.Session.GetString("UserRole"));
        Console.WriteLine(httpContext.Session.GetString("UserCompany"));
        return Results.Ok(user);
    }
    return Results.Unauthorized();
}

static Task<IResult> LogoutUser(HttpContext httpContext)
{
    Console.WriteLine("/api/logout has been called");
    httpContext.Session.Clear();
    return Task.FromResult(Results.Ok("User has been logged out"));
}

async Task<IResult> GetIssues(HttpContext context)
{
    var userId = context.Session.GetString("UserId");
    Console.WriteLine(userId); // To check the userID value for debugging
    var userName = context.Session.GetString("UserName");
    var userRole = context.Session.GetString("UserRole");
    var userCompany = context.Session.GetString("UserCompany");

    if (userId == null)
    {
        return Results.Unauthorized();
    }

    var issues = new List<Issue>();
    string query;

    if (userRole == "admin")
    {
        query = "SELECT * FROM supportform_view";
    }
    else if (userRole == "manager")
    {
        query = "SELECT * FROM supportform_view WHERE company = $1";
    }
    else
    {
        query = "SELECT * FROM supportform_view WHERE employee = $1";
    }

    // If user is admin just fetch all issues
    await using var cmd = db.CreateCommand(query);

    // if user is manager, fetch issues for their company
    if (userRole == "manager")
    {
        cmd.Parameters.AddWithValue(userCompany ?? (object)DBNull.Value);
    }
    // if user is employee, fetch issues assigned to them
    else if (userRole == "employee")
    {
        cmd.Parameters.AddWithValue(userName ?? (object)DBNull.Value);
    }

    await using var reader = await cmd.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
        issues.Add(new Issue(
            reader.GetInt32(0),
            reader.GetString(1),
            reader.GetString(2),
            reader.GetString(3),
            reader.GetString(4),
            await reader.IsDBNullAsync(5) ? null : reader.GetString(5),
            reader.GetBoolean(6),
            reader.GetString(7)
        ));
    }

    return Results.Ok(issues);
}

async Task<IResult> CreateIssue(IssueRequest issue)
{

    Console.WriteLine("Creating an issue..");
    Console.WriteLine(issue.Company);
    Console.WriteLine(issue.Subject);
    Console.WriteLine(issue.Message);
    Console.WriteLine(issue.Sender_email);
    if (string.IsNullOrEmpty(issue.Subject) || string.IsNullOrEmpty(issue.Message) || string.IsNullOrEmpty(issue.Sender_email))
    {
        Console.WriteLine("Missing required fields");
        return Results.BadRequest("Missing required fields");
    }

    var randomChatToken = Guid.NewGuid().ToString("N").Substring(0, 16);

    await using var cmd = db.CreateCommand("INSERT INTO supportform (company_id, subject, message, sender_email, chat_token) VALUES ($1, $2, $3, $4, $5)");
    cmd.Parameters.AddWithValue(issue.Company);
    cmd.Parameters.AddWithValue(issue.Subject);
    cmd.Parameters.AddWithValue(issue.Message);
    cmd.Parameters.AddWithValue(issue.Sender_email);
    cmd.Parameters.AddWithValue(randomChatToken);
    await cmd.ExecuteNonQueryAsync();

    return Results.Created("Issue has been created", issue);
}

async Task<IResult> GetCompanies()
{
    var companies = new List<Company>();
    await using var cmd = db.CreateCommand("SELECT * FROM company");
    await using var reader = await cmd.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        companies.Add(new Company(
            reader.GetInt32(0),
            reader.GetString(1)
        ));
    }
    return Results.Ok(companies);
}

async Task<IResult> GetMessages(string chatToken)
{
    Console.WriteLine("Called GetMessages - Requesting messages with token: " + chatToken);
    var messages = new List<Message>();

    await using var cmd = db.CreateCommand("SELECT * FROM message WHERE issue_id = (SELECT id FROM supportform_view WHERE token = $1)");
    cmd.Parameters.AddWithValue(chatToken);
    await using var reader = await cmd.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        messages.Add(new Message(
            reader.GetInt32(0),
            reader.GetString(1),
            reader.GetString(2),
            reader.GetInt32(3)
        ));

    }
    if (messages.Count < 1)
    {
        Console.WriteLine("No messages found for this chat token");
        await using var cmd2 = db.CreateCommand("SELECT id FROM supportform_view WHERE token = $1");
        cmd2.Parameters.AddWithValue(chatToken);
        await using var reader2 = await cmd2.ExecuteReaderAsync();

        if (await reader2.ReadAsync())
        {
            return Results.Ok(reader2.GetInt32(0));
        }
        return Results.NotFound("No issue found with this token");
    }
    Console.WriteLine("Messages found");
    return Results.Ok(messages);

}

async Task<IResult> PostMessage(MessageRequest message)
{
    Console.WriteLine("Content: " + message.Content + " Sender: " + message.Sender + " IssueId: " + message.IssueId);
    if (string.IsNullOrEmpty(message.Content) || string.IsNullOrEmpty(message.Sender) || message.IssueId == 0)
    {
        Console.WriteLine("Missing required fields");
        return Results.BadRequest("Missing required fields");
    }
    Console.WriteLine("Called PostMessage - Posting message: " + message.Content);
    await using var cmd = db.CreateCommand("INSERT INTO message (sender, message, issue_id) VALUES ($1, $2, $3)");
    cmd.Parameters.AddWithValue(message.Sender);
    cmd.Parameters.AddWithValue(message.Content);
    cmd.Parameters.AddWithValue(message.IssueId);
    await cmd.ExecuteNonQueryAsync();
    return Results.Created("Message has been posted", message);
}

await app.RunAsync();
