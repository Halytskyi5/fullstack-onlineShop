package shop_api.app.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import shop_api.app.dtos.UserDto;
import com.auth0.jwt.JWTVerifier;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;


@Component
public class UserAuthProvider {
    @Value("{security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UserDto dto) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);
        return JWT.create()
                .withIssuer(dto.getUsername())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                //.withClaim("firstName", dto.getFirstName())
                //.withClaim("lastName", dto.getLastName())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);
        UserDto user = new UserDto();
        user.setUsername(decoded.getIssuer());
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

    public static String getUserIdByToken(String token) {
        String jwt = token.replace("Bearer ", "");
        String userID = JWT.decode(jwt).getIssuer();
        return userID;
    }
}