package shop_api.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.AppException;
import shop_api.app.repositories.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    public String welcome(Long id) {
        if (this.authenticateAdmin(id)) {
            return "Hello ADMIN";
        }
        throw new AppException("User hasn't role ADMIN!", HttpStatus.FORBIDDEN);
    }

    private Boolean authenticateAdmin(Long id) {
        UserEntity user = this.userRepository.findById(id)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        String[] roles = user.getRoles().split(" ");
        for(String role : roles) {
            if (role.equals("ADMIN")) {
                return true;
            }
        }
        return false;
    }
}
