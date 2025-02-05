package shop_api.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop_api.app.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}
