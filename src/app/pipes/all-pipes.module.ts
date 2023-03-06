import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllcomponentsModule } from '../component/allcomponents.module';
import { FilterPipe } from './filtro-by-category/filter-pipe';



@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
  ],
  exports:[FilterPipe]
})
export class AllPipesModule { }
