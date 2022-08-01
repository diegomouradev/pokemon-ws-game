import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
	{
		path: '',
		component: HomepageComponent,
	},
	{
		path: 'game',
		loadChildren: () => import('./features/game-board/game-board.module').then((m) => m.GameBoardModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
