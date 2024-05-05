import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTranformLabel'
})
export class FilterTranformLabelPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/(?:^|\s)\S/g, a => a.toUpperCase())
  }

}
