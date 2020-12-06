import { CommonModule } from '@angular/common';
import { DataGeneratorComponent } from './data-generator.component';
import { DataGeneratorRoutingModule } from './data-generator-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DataGeneratorComponent],
  imports: [CommonModule, SharedModule, DataGeneratorRoutingModule]
})
export class DataGeneratorModule {}
