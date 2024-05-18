import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'divieWords'
})
export class DivieWordsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s([A-Z])/g, (match) => match.toLowerCase());
  }
}
