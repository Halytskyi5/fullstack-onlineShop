package shop_api.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop_api.app.entity.ProductEntity;
import shop_api.app.repository.ProductRepository;

import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<ProductEntity> addProducts(ProductEntity... products) {
        return this.productRepository.saveAll(Arrays.asList(products));
    }

    public List<ProductEntity> getAllProducts() {
        return this.productRepository.findAll();
    }
    public ProductEntity getProduct(Long id) {
        return this.productRepository.findById(id).get();
    }

    public void deleteProduct(Long id) {
        this.productRepository.deleteById(id);
    }
}
