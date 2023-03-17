import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFilter',
})
export class TextFilterPipe implements PipeTransform {
  transform(icons: any[], search: string): any[] {
    return icons.filter((icon) => {
      return icon.title.toLowerCase().includes(search.toLowerCase())
        || icon.name.toLowerCase().includes(search.toLowerCase())
    });
  }
}
