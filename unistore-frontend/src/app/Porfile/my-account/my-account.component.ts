import { Component } from '@angular/core';

@Component({
  selector: 'app-my-account',
  imports: [],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {
username:any=localStorage.getItem("username");
email:any=localStorage.getItem("email");
}