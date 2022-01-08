import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordListComponent } from './word-list.component';

const routes: Routes = [{ path: '', component: WordListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordListRoutingModule { }
