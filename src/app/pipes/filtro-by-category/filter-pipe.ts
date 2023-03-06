import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => {
      if (Array.isArray(item.category)) {
        return item.category.includes(filter);
      } else {
        return item.category === filter;
      }
    });
  }
}
