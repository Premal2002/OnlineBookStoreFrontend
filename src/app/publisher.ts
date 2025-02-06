export class Publisher{
    pId:number;
	pName:string;
    email:string;
    password:string;
	pCountry:string;
    pStatus:boolean;

    constructor(pId:number,pName:string,email:string,password:string,pCountry:string,pStatus:boolean){
        this.pId = pId;
        this.pName = pName;
        this.email = email;
        this.password = password;
        this.pCountry = pCountry;
        this.pStatus=pStatus;
    }

}