import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from '../core/auth/auth.module';

@NgModule({
	declarations: [HeaderComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, AuthModule],
	exports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent, AuthModule],
})
export class SharedModule {}
