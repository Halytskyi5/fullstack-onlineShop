package shop_api.app.exceptions;

public class CartEmptyException extends Exception {
    public CartEmptyException(String message) {
        super(message);
    }
}
