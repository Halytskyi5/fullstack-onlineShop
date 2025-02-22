import {CartItemDto} from "./cartItemDto";

export interface UserDto {
  id : number,
  username : string,
  token : string,
  roles : string,
  itemsInCart ?: CartItemDto[]
}
