import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/game-board/game-board.module').then(
        (m) => m.GameBoardModule
      ),
  },
  { path: 'word-list', loadChildren: () => import('./word-list/word-list.module').then(m => m.WordListModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
