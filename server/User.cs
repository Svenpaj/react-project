namespace server;
public record User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int Company { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public int Role { get; set; }

    public User(int id, string email, string password, int company, string firstName, string lastName, int role)
    {
        Id = id;
        Email = email;
        Password = password;
        Company = company;
        Firstname = firstName;
        Lastname = lastName;
        Role = role;
    }
}