class Globals { }

class DevelopmentGlobals extends Globals {
    public urls = {
        general: "http://localhost:8080/couponsProject/",
        administrator: "http://localhost:8080/couponsProject/admin/",
        company: "http://localhost:8080/couponsProject/company/",
        customer: "http://localhost:8080/couponsProject/customer/",
        guest: "http://localhost:8080/couponsProject/guest/"
    }
}

class ProductionGlobals extends Globals {
    public urls = {
        administrator: "/couponsProject/admin/",
        company: "/couponsProject/company/",
        customer: "/couponsProject/customer/",
        guest: "/couponsProject/guest/",
        general: "/couponsProject/"
    }
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;