namespace server;

public record Issue
{
    public int Id { get; set; }
    public string Company { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
    public string Sender_email { get; set; }
    public string? Employee { get; set; }
    public bool IsResolved { get; set; }
    public string ChatToken { get; set; }

    public Issue(int id, string company, string subject, string message, string sender_email, string? employee, bool isResolved, string chatToken)
    {
        Id = id;
        Company = company;
        Subject = subject;
        Message = message;
        Sender_email = sender_email;
        Employee = employee;
        IsResolved = isResolved;
        ChatToken = chatToken;
    }
}