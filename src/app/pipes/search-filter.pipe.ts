import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(arr: any[], searchValue: string, field: string ): any {
    if (!arr || !searchValue) {
      
      return arr;
    }

    searchValue = searchValue.toLowerCase()

    return arr.filter((item)=>{
      return item[field]?.toLowerCase().includes(searchValue)
    })
  }

}
