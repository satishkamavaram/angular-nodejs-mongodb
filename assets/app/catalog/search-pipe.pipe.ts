import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: any, search: string,field1:string,field2:string,): any {
    if(search=='' ){
      return value;
    }
    const output = [];
    for(let item of value){
      if(item[field1].search(new RegExp(search,'ig')) !== -1
         || item[field2].search(new RegExp(search,'ig')) !== -1){
          output.push(item);
      }
    }
    return output;
  }

}
