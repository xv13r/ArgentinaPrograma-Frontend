import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customdate'
})
export class CustomDatePipe implements PipeTransform {

    transform(value: Date): string {
        const month = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        if (typeof value != 'undefined' && value) {
            return month[value.getMonth()] + ", " + value.getFullYear();
        }
        return "Actualidad";
    }
}