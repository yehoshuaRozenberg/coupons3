import CouponDetails from "./CouponDetails";

class Customer{
    public id: number=0;
    public firstName: string="";
    public lastName: string="";
    public email: string="";
    public password: string="";
    public coupons: CouponDetails[] = []; 
    
}

export default Customer;

