import { RouterModule, Routes } from '@angular/router';

import { DataGeneratorRoutingModule } from './data-generator/data-generator-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    DetailRoutingModule,
    DataGeneratorRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
