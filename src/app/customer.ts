export class Customer{
    cust_id:number;
	customer_name:string;
    customer_address:string;
    customer_contact:string;
    email:string;
    password:string;


    constructor(cust_id:number,customer_name:string,customer_address:string,customer_contact:string,email:string,password:string){
        this.cust_id = cust_id;
        this.customer_name = customer_name;
        this.customer_address = customer_address;
        this.customer_contact = customer_contact;
        this.email = email;
        this.password = password;
    }

}