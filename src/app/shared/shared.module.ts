import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
