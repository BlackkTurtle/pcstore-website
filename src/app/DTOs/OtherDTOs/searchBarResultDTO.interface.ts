import { GetBrandDTO } from "../BrandDTOs/getBrandDTO.interface";
import { CategoryIdNameDTO } from "../CategoryDTOs/categoryIdNameDTO.interface";
import { ProductIdNameDTO } from "../ProductDTOs/ProductIdNameDTO.interface";

export interface SearchBarResultDTO
{
    brands:GetBrandDTO[],
    categorys:CategoryIdNameDTO[],
    products: ProductIdNameDTO[]
}