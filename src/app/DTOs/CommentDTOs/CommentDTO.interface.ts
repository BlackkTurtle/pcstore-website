export interface CommentDTO{
    id:number,
    userId:string,
    fullName:string,
    createdDate:Date,
    dateModified:Date,
    content:string,
    children:CommentDTO[]
}