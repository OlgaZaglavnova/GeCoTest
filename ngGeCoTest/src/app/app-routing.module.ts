import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {
    path: '/',
    component: CategoryComponent
  },
  {
    path: '/category/:id',
    component: CategoryComponent
  },
  {
    path: '/cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
