import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {

    it("should throw error when id is empty",() => {

        expect(() => {
            let order = new Order("","123",[]);            
        }).toThrowError("Id is required");
    });

   it("should throw error when customerId is empty", () => {

        expect(() => {    
            let order = new Order("1","",[]);            
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when items are empty", () => {

        expect(() => {
            let order = new Order("123","123",[]);
        }).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("id1","produto1",1000);
        const item2 = new OrderItem("id1","produto1",2500);
        const order = new Order("order1","123456",[item1, item2]);

        let total =  order.total();
        
        expect(total).toBe(3500);

    });

});