import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordListRoutingModule } from './word-list-routing.module';
import { WordListComponent } from './word-list.component';


@NgModule({
  declarations: [WordListComponent],
  imports: [
    CommonModule,
    WordListRoutingModule
  ]
})
export class WordListModule { }
