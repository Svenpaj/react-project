namespace server;
public record IssueRequest
{
    public required int Company { get; set; }
    public required string Subject { get; set; }
    public required string Message { get; set; }
    public required string Sender_email { get; set; }
    public int? Employee_id { get; set; }

}