import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () =>{

    it("should change the prices of all products", () => {

        const product1 = new Product("product1","Product 1",10);
        const product2 = new Product("product2","Product 2",20);
        const products = [product1,product2];

        ProductService.increasePrice(products,10);        

        expect(product1.price).toBe(11);
        expect(product2.price).toBe(22);
    });

    it("should change the prices of all products", () => {

      new Product("product1","Product 1",10);  let products : Product[] = [];
        let product = new Product("product1","Product 1",10);
        products.push(product);
        product = new Product("product2","Product 2",20);
        products.push(product);

        ProductService.increasePrice(products, 100);

        expect(products[0].price).toBe(20);
        expect(products[1].price).toBe(40);

    });
});