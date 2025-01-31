import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  dataUserForm : FormGroup = new FormGroup({
    userName : new FormControl("", Validators.required),
    userEmail : new FormControl("", [Validators.required, Validators.email]),
    userPhone : new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")]),
    userMessage : new FormControl("", Validators.required)
  });
  clickButton(){
    this.dataUserForm.controls
  }
}
