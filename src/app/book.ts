export class Book{
    bId : number;
    pId : number;
    bTitle : string;
    bDesc : string;
    bCategory : string;
    bStatus : string;
    bPrice : number;
    bQuantity : number;
    bImgPath : string;
    booksSold : number;


    constructor(bId : number,pId : number,bTitle : string,bDesc : string,bCategory : string,bStatus : string,bPrice : number,bQuantity : number,bImgPath : string,booksSold : number){
        this.bId = bId;
        this.pId = pId;
        this.bTitle = bTitle;
        this.bDesc = bDesc;
        this.bCategory = bCategory;
        this.bStatus = bStatus;
        this.bPrice = bPrice;
        this.bQuantity = bQuantity;
        this.bImgPath = bImgPath;
        this.booksSold = booksSold;
    }

}