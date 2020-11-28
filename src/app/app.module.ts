import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WsGameComponent } from './ws-game/ws-game.component';
import { GridComponent } from './ws-game/grid/grid.component';
import { TileComponent } from './ws-game/tile/tile.component';
import { ListComponent } from './ws-game/list-left/list-left.component';

import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';

import { ListRightComponent } from './ws-game/list-right/list-right.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    TileComponent,
    ListComponent,
    WsGameComponent,
    ListRightComponent
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
