package shop_api.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop_api.app.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}
