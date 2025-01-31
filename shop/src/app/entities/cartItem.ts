import {User} from "./user";

export interface CartItem {
  id : number;
  productId: number;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  user : {
    id : number,
    username : string,
    password : string
  }
}
