package shop_api.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import shop_api.app.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}
