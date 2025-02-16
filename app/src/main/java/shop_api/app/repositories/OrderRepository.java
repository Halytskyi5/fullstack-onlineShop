package shop_api.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import shop_api.app.entities.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}
