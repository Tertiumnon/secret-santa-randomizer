import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DataGeneratorComponent } from './data-generator.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'data-generator',
    component: DataGeneratorComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataGeneratorRoutingModule {}
