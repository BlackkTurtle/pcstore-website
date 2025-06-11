import { Type } from "@angular/core";

export interface TabItem {
    title: string,
    component: Type<any>,
    type: string
}