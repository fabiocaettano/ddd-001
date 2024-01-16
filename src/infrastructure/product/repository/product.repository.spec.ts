import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../sequelize/product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {   
    
        let sequilize : Sequelize;

        beforeEach(async () => {
            sequilize = new Sequelize({
                dialect: "sqlite",
                storage: ":memory:",
                logging: false,
                sync: { force: true},
            });            
            
            sequilize.addModels([ProductModel]);            
            await sequilize.sync();
        });        

        afterEach(async () => {
            await sequilize.close();
        });    

        it("should create a product", async () => {
            
            const productRepository = new ProductRepository();            
            const product = new Product("1","Product 1",100);

            await productRepository.create(product);

            const productModel =  await ProductModel.findOne({where: { id: "1"}});

            expect(productModel.toJSON()).toStrictEqual({
                id: "1",
                name: "Product 1",
                price: 100
            });
        });

        it("should update a product", async () => {
            
            const productRepository = new ProductRepository();            
            const product = new Product("2","Product 1",100);

            await productRepository.create(product);            

            product.changeName("Product 2");
            product.changePrice(200);

            await productRepository.update(product);

            const productModel =  await ProductModel.findOne({where: { id: "2"}});

            expect(productModel.toJSON()).toStrictEqual({
                id: "2",
                name: "Product 2",
                price: 200
            });
        });

        it("shoud find a product", async () => {

            const productRepository = new ProductRepository();
            const product = new Product("3","Product 3",300);
            await productRepository.create(product);

            const productModel =  await ProductModel.findOne({where: { id: "3"}});

            const foundProduct = await productRepository.find("3");

            expect(productModel.toJSON()).toStrictEqual({
                id : foundProduct.id,
                name: foundProduct.name,
                price: foundProduct.price
            });
        });

        it("should find a products", async () => {

            const productRepository = new ProductRepository();
 
            const product1 = new Product("1","Product 1",100); 
            await productRepository.create(product1);

            const product2 = new Product("2","Product 2",200);
            await productRepository.create(product2);
            
            const product3 = new Product("3","Product 3",300);
            await productRepository.create(product3);

            const foundProducts = await productRepository.findAll();
            const products = [product1,product2,product3];

            expect(products).toEqual(foundProducts);

        });
});  