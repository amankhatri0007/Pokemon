import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from '../detail/detail.page';
import { HomePage } from './home.page';

//Setting up routes which are lazy loaded by app.routing.module
const routes: Routes = [
  { path: '',component: HomePage},
  { path:'detail',component:DetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
