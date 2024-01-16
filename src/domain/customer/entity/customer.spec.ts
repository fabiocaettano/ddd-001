import Address from "../value_objects/adresses";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let customer = new Customer("","Fabio");            
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {

        expect(() => {
            let customer = new Customer("1","");            
        }).toThrowError("Name is required");
    });

    it("should change name", () =>{

        const customer = new Customer("123","Sophia");
        customer.changeName("Michele");
        expect(customer.name).toBe("Michele");
    });

    it("should activate customer", () =>{

        const customer = new Customer("1","Fabio");
        const address = new Address("Street",5000,"99999-999","Fortaleza");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);

    }); 

    it("should desactivate customer", () =>{

        const customer = new Customer("1","Fabio");       

        customer.deactivate();

        expect(customer.isActive()).toBe(false);

    }); 

    it("should and reward points", () => {

        const customer = new Customer("1","Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

    it("should throw error when address is undefinied when you activate a customer", () =>{
        expect(() => {
            const customer = new Customer("1","Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
        
});

