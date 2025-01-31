package shop_api.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop_api.app.entity.CartItemEntity;
import shop_api.app.entity.UserEntity;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItemEntity, Long> {
    CartItemEntity findCartItemEntityByProductId(Long productId);
    CartItemEntity findByProductId(Long p);
    List<CartItemEntity> findAllByUser(UserEntity user);
}
