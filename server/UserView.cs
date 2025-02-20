namespace server;

public record UserView
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Company { get; set; }
    public string Role { get; set; }

    public UserView(int id, string email, string password, string firstName, string lastName, string company, string role)
    {
        Id = id;
        Email = email;
        Password = password;
        Firstname = firstName;
        Lastname = lastName;
        Company = company;
        Role = role;
    }
}