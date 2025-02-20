namespace server;

public record UserRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}