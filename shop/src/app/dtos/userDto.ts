import {CartItemDto} from "./cartItemDto";

export interface UserDto {
  id : number,
  username : string,
  token : string,
  itemsInCart ?: CartItemDto[]
}
