package shop_api.app.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import shop_api.app.exceptions.AppException;

@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(value = { AppException.class })
    @ResponseBody
    public ResponseEntity<String> handleException(AppException e) {
        return ResponseEntity.status(e.getHttpStatus()).body(e.getMessage());
    }
}
