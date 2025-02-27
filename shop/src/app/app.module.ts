import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule} from "ngx-pagination";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutBrandComponent } from './pages/about-brand/about-brand.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HttpClientModule } from "@angular/common/http";
import { CartComponent } from './pages/cart/cart.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import { OrderComponent } from './pages/order/order.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import {MatRadioButton, MatRadioModule} from "@angular/material/radio";
import { TestComponent } from './test/test.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SlideDownPanelComponent } from './components/slide-down-panel/slide-down-panel.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EditProductDetailsComponent } from './components/edit-product-details/edit-product-details.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutBrandComponent,
    ContactsComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    OrderSuccessComponent,
    TestComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SlideDownPanelComponent,
    AdminPageComponent,
    EditProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
