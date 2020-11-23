import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { TileComponent } from './tile/tile.component';
import { ListComponent } from './list/list.component';

import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { WordgameComponent } from './wordgame/wordgame.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    TileComponent,
    ListComponent,
    WordgameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    InlineSVGModule.forRoot({baseUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
