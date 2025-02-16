package shop_api.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import shop_api.app.entities.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
