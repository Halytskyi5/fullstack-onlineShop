package shop_api.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import shop_api.app.entities.CartItemEntity;
import shop_api.app.entities.UserEntity;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItemEntity, Long> {
    CartItemEntity findCartItemEntityByProductId(Long productId);
    CartItemEntity findByProductId(Long p);
    List<CartItemEntity> findAllByUser(UserEntity user);
}
