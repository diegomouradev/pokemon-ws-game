import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModuleRoutingModule } from './login-module-routing.module';
import { LoginModuleComponent } from './login-module.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginModuleComponent],
  imports: [CommonModule, LoginModuleRoutingModule, SharedModule],
})
export class LoginModuleModule {}
