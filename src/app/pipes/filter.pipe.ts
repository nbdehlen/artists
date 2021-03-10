import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    items: any[],
    searchText: string,
    getValue: (item: any) => any
  ): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

    return items.filter((item) =>
      getValue(item).toLowerCase().includes(searchText)
    );
  }
}
