import {CartItem} from "./cartItem";

export interface User {
  id : number,
  username : string,
  password : string,
  itemsInCart : [{
    "id": number
    "productId": number
    "productName": string
    "productImage": string
    "productPrice": string
    "quantity": number
  }]
}
