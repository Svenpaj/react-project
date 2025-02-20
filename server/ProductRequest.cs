namespace server;

public record Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string Description { get; set; }
    public int Stock { get; set; }
    public string CategoryName { get; set; }
    public string Image_url { get; set; }

    public Product(int id, string name, double price, string description, int stock, string categoryName, string image_url)
    {
        Id = id;
        Name = name;
        Price = price;
        Description = description;
        Stock = stock;
        CategoryName = categoryName;
        Image_url = image_url;
    }
}
