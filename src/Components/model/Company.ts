import CouponDetails from "./CouponDetails";

class Company{
    public id: number=0;
    public name: string="";
    public email: string="";
    public password: string="";
    public coupons: CouponDetails[] = []; 
    
}

export default Company;