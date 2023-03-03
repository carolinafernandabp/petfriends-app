import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByCategory } from './filtro-by-category/filter-by-category.pipe';
import { AllcomponentsModule } from '../component/allcomponents.module';



@NgModule({
  declarations: [FilterByCategory],
  imports: [
    CommonModule,
  ],
  exports:[FilterByCategory]
})
export class AllPipesModule { }
