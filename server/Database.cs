namespace server;
using Npgsql;

public class Database
{
    private readonly string _host = "localhost";
    private readonly string _port = "5432"; 
    private readonly string _username = "postgres";
    private readonly string _password = "hejhej123";
    private readonly string _database = "react_e_commerce";

    private readonly NpgsqlDataSource _connection;

    public NpgsqlDataSource Connection()
    {
        return _connection;
    }

    public Database()
    {
        string connectionString = $"Host={_host};Port={_port};Username={_username};Password={_password};Database={_database}";
        var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
        
        _connection = dataSourceBuilder.Build();
    }
}
