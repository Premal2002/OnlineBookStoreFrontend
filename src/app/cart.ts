export class Cart{
	cId:number;
    custId:number;
    bId:number;
    bTitle:string;
    bDesc:string;
    bPrice:number;
    bImgPath:string;

    constructor(cId:number,custId:number,bId:number,bTitle:string,bDesc:string,bPrice:number,bImgPath:string){
        this.cId = cId;
		this.custId = custId;
		this.bId = bId;
		this.bTitle = bTitle;
		this.bDesc = bDesc;
		this.bPrice = bPrice;
        this.bImgPath = bImgPath;
    }

}