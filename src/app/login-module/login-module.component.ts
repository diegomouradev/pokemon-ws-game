import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.scss'],
})
export class LoginModuleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    'email-input': new FormControl(),
    'password-input': new FormControl(),
  });
}
