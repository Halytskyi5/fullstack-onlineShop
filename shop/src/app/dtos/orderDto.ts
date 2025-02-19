export interface OrderDto {
  id : number,
  user : {
    id : number,
    username : string,
    password : string
  },
  items : [
    {
      id : number;
      productId: number;
      productName: string;
      productImage: string;
      productPrice: number;
      quantity: number;
    }
  ]
}
