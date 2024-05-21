import { PartOrder } from "./partorder.interface";
import { Status } from "./status.interface";

export interface Order{
    orderId:Number,
    orderDate:Date,
    adress:string,
    userId:string,
    statusId:Number,
    partOrders:PartOrder[],
    status:Status
}