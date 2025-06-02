import { CategoryIdNameDTO } from "../CategoryDTOs/categoryIdNameDTO.interface";
import { CommentDTO } from "../CommentDTOs/CommentDTO.interface";
import { ReviewDTO } from "../CommentDTOs/ReviewDTO.interface";
import { ProductCharacteristicDTO } from "../ProductCharacteristicDTOs/ProductCharacteristicDTO.interface";

export interface FullProductDTO{
    id:number,
    name:string,
    price:number,
    images:string[],
    categoryIdNameDTO:CategoryIdNameDTO,
    brandName:string,
    description:string,
    createdDate:Date,
    rating:number,
    availlability:boolean,
    comments:CommentDTO[],
    reviews:ReviewDTO[],
    productCharacteristics:ProductCharacteristicDTO[]
}