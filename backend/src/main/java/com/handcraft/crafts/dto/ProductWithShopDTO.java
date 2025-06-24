package com.handcraft.crafts.dto;

public class ProductWithShopDTO {
    private int productId;
    private String productName;
    private String productDescription;
    private double productPrice;

    private int shopId;
    private String shopName;
    private String shopLocation;

    private String imageUrl;  // <-- Added this field

    // Constructor including imageUrl
    public ProductWithShopDTO(int productId, String productName, String productDescription, double productPrice,
                              int shopId, String shopName, String shopLocation, String imageUrl) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.shopId = shopId;
        this.shopName = shopName;
        this.shopLocation = shopLocation;
        this.imageUrl = imageUrl;
    }

    // Getters and setters

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductDescription() { return productDescription; }
    public void setProductDescription(String productDescription) { this.productDescription = productDescription; }

    public double getProductPrice() { return productPrice; }
    public void setProductPrice(double productPrice) { this.productPrice = productPrice; }

    public int getShopId() { return shopId; }
    public void setShopId(int shopId) { this.shopId = shopId; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public String getShopLocation() { return shopLocation; }
    public void setShopLocation(String shopLocation) { this.shopLocation = shopLocation; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
