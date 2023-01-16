import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'customFilter',
    pure: false
})
export class CallbackPipe implements PipeTransform {
    transform(items: any[], searchText: string): any {
        if (!items || !searchText) {
            return items;
        }

        return items.filter(item => item.label.toLocaleLowerCase().includes(searchText) || item.description.toLocaleLowerCase().includes(searchText) || item.category.toLocaleLowerCase().includes(searchText));
    }
}