export interface orderType{
    id ?: number,
    userId?:number,
    status?:string
}
export interface orderItemsType{
    id ?: number,
    orderid:number,
    productid:number,
    productquantity:number,
}
