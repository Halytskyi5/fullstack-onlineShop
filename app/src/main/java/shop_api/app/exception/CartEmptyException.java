package shop_api.app.exception;

public class CartEmptyException extends Exception {
    public CartEmptyException(String message) {
        super(message);
    }
}
