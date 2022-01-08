import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() {}

  // loginForm$ = this.form.valueChanges.pipe(
  //   defaultIfEmpty({toggleWordList: false}),
  //   map(changes => changes.toggleWordList),
  //   tap(result => console.log(result))
  // )
}
