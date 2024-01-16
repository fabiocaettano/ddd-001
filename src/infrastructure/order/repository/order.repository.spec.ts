import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/value_objects/adresses";
import Customer from "../../../domain/customer/entity/customer";
import OrderItem from "../../../domain/checkout/entity/order_item";
import Product from "../../../domain/product/entity/product";
import CustomerModel from "../../customer/sequelize/customer.model";
import OrderItemModel from "../../order/sequelize/order-item.models";
import OrderModel from "../../order/sequelize/order.model";
import ProductModel from "../../product/sequelize/product.model";
import CustomerRepository from "../../customer/repository/customer.repository";
import OrderRepository from "../../order/repository/order.repository";
import ProductRepository from "../../product/repository/product.repository";
import Order from "../../../domain/checkout/entity/order";

describe("Order Repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });
        sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1",product.name,product.price,product.id,2);

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({where: { id: order.id },include: ["items"],});

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });        
    });

    it("shoud update a order", async () => {

        // Create customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Customer One");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // Create product
        const productRepository = new ProductRepository();
        const product1 = new Product("product1", "Product One", 10);
        await productRepository.create(product1);

        const product2 = new Product("product2", "Product Two", 20);
        await productRepository.create(product2);

        const product3 = new Product("product3", "Product Three", 30);
        await productRepository.create(product3);

        // Create order with 3 products
        const orderItem1 = new OrderItem("item1",product1.name,product1.price,product1.id,1);
        const orderItem2 = new OrderItem("item2",product2.name,product2.price,product2.id,2);
        const orderItem3 = new OrderItem("item3",product3.name,product3.price,product3.id,3);

        const order1 = new Order("order1", "customer1", [orderItem1,orderItem2,orderItem3]);
        
        const orderRepository1 = new OrderRepository();
        await orderRepository1.create(order1);
        
        //Assert
        // (1 * 10) + (2 * 20) + (3 * 30) = 140
        // Total Order 140
        expect(order1.total()).toEqual(140);

        
        //Update quantity of order        
        order1.changeQuantity("item1",4);
        order1.changeQuantity("item2",5);
        order1.changeQuantity("item3",6);      
        await orderRepository1.update(order1);
        
        //Assert
        // (4 * 10) + (5 * 20) + (6 * 30) = 320        
        // Total Order 320
        expect(order1.total()).toEqual(320)

        //orderModel1.items.forEach( item => {                
        //    console.log(item.quantity);
        //})                    
    });

    it("should find a order", async () => {

        // Create customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Customer One");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // Create product
        const productRepository = new ProductRepository();
        const product1 = new Product("product1", "Product One", 10);
        await productRepository.create(product1);

        // Create order with 1 product
        const orderItem1 = new OrderItem("item1",product1.name,product1.price,product1.id,1);
        const order = new Order("order1", "customer1", [orderItem1]);        
        const orderRepository1 = new OrderRepository();
        await orderRepository1.create(order);

        // Find Order
        const orderModel = await OrderModel.findOne({ where: { id : "order1"}, include: ["items"]});

        const foundOrder = await orderRepository1.find("order1");

        //Assert
        
        expect(order).toEqual(foundOrder);
        

        expect(orderModel.toJSON()).toStrictEqual({
            id: "order1",
            customer_id: "customer1",
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity,
                    order_id: order.id,
                    product_id: orderItem1.productId,
                },
            ],
        });
    });

    it("should find a orders", async () => {

        // Create customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Customer One");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // Create product
        const productRepository = new ProductRepository();
        const product1 = new Product("product1", "Product One", 10);
        await productRepository.create(product1);

        // Create order 1
        const orderItem1 = new OrderItem("item1",product1.name,product1.price,product1.id,1);
        const order1 = new Order("order1", "customer1", [orderItem1]);        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);

        // Create order 2
        const orderItem2 = new OrderItem("item2",product1.name,product1.price,product1.id,1);
        const order2 = new Order("order2", "customer1", [orderItem2]);                
        await orderRepository.create(order2);

        // Create order 3
        const orderItem3= new OrderItem("item3",product1.name,product1.price,product1.id,1);
        const order3 = new Order("order3", "customer1", [orderItem3]);                
        await orderRepository.create(order3);


        // Find All Orders
        const foundOrders = await orderRepository.findAll();               
        const orders = [order1, order2, order3];

        //Assert
        expect(orders).toEqual(foundOrders);

    });
});