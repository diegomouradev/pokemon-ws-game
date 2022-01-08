import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent],
})
export class SharedModule {}
