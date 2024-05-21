import { Product } from "./product.interface";

export interface PartOrder{
    porderId:number,
    article:number,
    orderId:number,
    quantity:number,
    price:number,
    product:Product
}