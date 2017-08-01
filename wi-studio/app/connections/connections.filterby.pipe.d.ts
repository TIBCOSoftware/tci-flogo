import { PipeTransform } from "@angular/core";
export declare class FilterBy implements PipeTransform {
    transform(items: any[], field: string, value: string): any[];
}
