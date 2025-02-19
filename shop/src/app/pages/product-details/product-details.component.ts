import {Component, Input, OnInit} from '@angular/core';
import {ProductDto} from "../../dtos/productDto";
import {CartItemDto} from "../../dtos/cartItemDto";
import {ActivatedRoute} from "@angular/router";
import {ProductDetailService} from "../../services/product-detail.service";
import {Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  constructor(
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute,
    private cartService : CartService) {
  }
  product : ProductDto;
  cart : CartItemDto[];
  cartSubscription : Subscription;
  data : string = "1";
  quantity: number = 1;
  ngOnInit() {
    this.getProduct();
    this.cartSubscription = this.productDetailService.getProductFromCart(2)
      .subscribe( (data ) => {
      this.cart = data;
    })
  }
  getProduct(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productDetailService.getProduct(id).subscribe(product =>{
      this.product = product;
    })
  }


  parseData(product : ProductDto){
    this.quantity = parseInt(this.data);
    this.addToCart(product);
  }
  addToCart(product : ProductDto){
    let cartItem : CartItemDto = {
      id : 0,
      quantity : this.quantity,
      productPrice: product.price,
      productId : product.id,
      productImage : product.image,
      productName: product.name,
      user : {
        id : 0,
        username : "",
        password : ""
      }
    };
    let findItem;

    if(this.cart.length > 0){
      findItem = this.cart.find( (item) => item.productId === cartItem.productId);
      if (findItem){
        findItem.quantity += cartItem.quantity;
        this.updateToCart(findItem);
      }
      else {
        this.postToCart(cartItem, 2);
      }
    }else {
      this.postToCart(cartItem, 2);
    }
    alert(`Товар ${product.name} кількістю ${cartItem.quantity} шт успішно добавлено в корзину!`)
  }
  postToCart(product : CartItemDto, userId : number){
    this.productDetailService.postProductToCart(product ,userId).subscribe( (data) => {
        this.cart.push(data)
      }
    );
  }
  updateToCart(cartItem : CartItemDto){
    this.productDetailService.updateProductToCart(cartItem).subscribe( (data) =>{
      this.cart.map(val => {
        if(val.id === data.id) {
          val.quantity = data.quantity;
        }
      })
    })
  }
  sendCartProducts(){
    this.cartService.sendUpdate(this.cart);
  }
  ngOnDestroy(){
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
