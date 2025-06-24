package com.handcraft.crafts.repository;

import com.handcraft.crafts.dto.ProductWithShopDTO;
import com.handcraft.crafts.entity.Product;
import com.handcraft.crafts.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    // Get all products of a specific shop
    List<Product> findByShop(Shop shop);
    List<Product> findByShopIn(List<Shop> shops);

    // Optional: Search by product name (if needed in future)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Fetch all products with their shop info (custom DTO projection)
    @Query("SELECT new com.handcraft.crafts.dto.ProductWithShopDTO(" +
            "p.id, p.name, p.description, p.price, s.id, s.shopName, s.location, p.imageUrl) " +
            "FROM Product p JOIN p.shop s")
    List<ProductWithShopDTO> findAllProductsWithShopInfo();

    // Alias method that calls findAllProductsWithShopInfo()
    default List<ProductWithShopDTO> findAllWithShops() {
        return findAllProductsWithShopInfo();
    }
}
