import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategory implements PipeTransform {

  transform(publicaciones: any[], category: string): any[] {
    if (!category || category === 'TODAS') {
      return publicaciones;
    }

    return publicaciones.filter(publicacion => publicacion.category === category);
  }

}
