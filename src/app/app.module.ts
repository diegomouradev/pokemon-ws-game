import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthModule } from './core/auth/auth.module';

@NgModule({
	declarations: [AppComponent, HeaderComponent, HomepageComponent],
	imports: [BrowserModule, AppRoutingModule, AuthModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
