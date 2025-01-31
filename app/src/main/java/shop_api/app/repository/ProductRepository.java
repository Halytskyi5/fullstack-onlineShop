package shop_api.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import shop_api.app.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
