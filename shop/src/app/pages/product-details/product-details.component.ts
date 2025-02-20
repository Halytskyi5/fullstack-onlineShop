import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductDto} from "../../dtos/productDto";
import {CartItemDto} from "../../dtos/cartItemDto";
import {ActivatedRoute} from "@angular/router";
import {ProductDetailService} from "../../services/product-detail.service";
import {Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";
import {UserDto} from "../../dtos/userDto";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy{
  constructor(
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute,
    private cartService : CartService,
    private authService : AuthService) {
  }
  product : ProductDto;
  cart : CartItemDto[];
  user : UserDto;
  getCartSubscription : Subscription;
  getProductSubscription : Subscription;
  postCartSubscription : Subscription;

  data : string = "1";
  quantity: number = 1;
  messageToShow : string = '';
  showMessage : boolean = false;

  ngOnInit() {
    this.getUser();
    this.getProduct();
    this.getCart();
  }

  getUser() {
    this.user = JSON.parse(this.authService.getUser());
  }
  getProduct(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.getProductSubscription = this.productDetailService.getProduct(id)
      .subscribe(product =>{
      this.product = product;
    })
  }
  getCart() {
    this.getCartSubscription = this.cartService.getProductFromCart(this.user.id)
      .subscribe( (data ) => {
        this.cart = data;
      })
  }


  parseData(product : ProductDto){
    this.quantity = parseInt(this.data);
    this.addToCart(product);
  }
  addToCart(product : ProductDto){
    let cartItem : CartItemDto = {
      quantity : this.quantity,
      productPrice: product.price,
      productId : product.id,
      productImage : product.image,
      productName: product.name
    };
    this.postToCart(cartItem, this.user.id);
  }

  postToCart(product : CartItemDto, userId : number){
    this.postCartSubscription = this.cartService.postProductToCart(product ,userId).subscribe({
      next:(data)=> {
      this.cart.push(data);
      this.sendCartProducts();
    }, error: error => {
        this.messageToShow = error.error;
        this.showMessage = true;
    }
  });
  }

  sendCartProducts(){
    this.cartService.sendUpdate(this.cart);
  }

  ngOnDestroy(){
    this.getProductSubscription.unsubscribe();
    this.getCartSubscription.unsubscribe();
    if(this.postCartSubscription) this.postCartSubscription.unsubscribe();
  }
}
