export class Order{
	orderNo:number;
    razorpayPaymentId : string;
	razorpayOrderId : string;
	razorpaySignature : string;
    orderDate : Date;
    orderAmount : number;
    cId:number;
    bId:number[];
    bTitle:string[];
    bPrice : number[];
    bImgpath : string[];
    bCount : number;
    isDelivered : boolean;

    constructor(orderNo:number,razorpayPaymentId : string,razorpayOrderId : string,razorpaySignature : string,orderDate : Date,orderAmount : number,cId:number,bId:number[], bTitle:string[],bPrice : number[],bImgpath : string[],bCount : number,isDelivered:boolean){
        this.orderNo=orderNo;
        this.razorpayPaymentId = razorpayPaymentId;
		this.razorpayOrderId = razorpayOrderId;
		this.razorpaySignature = razorpaySignature;
        this.orderDate=orderDate;
        this.orderAmount=orderAmount
        this.cId = cId;
        this.bId = bId;
        this.bTitle = bTitle;
		this.bPrice = bPrice;
		this.bImgpath = bImgpath;
        this.bCount=bCount;
        this.isDelivered = isDelivered;
    }

}