import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";
import ProductCreatedEvent from "../../product/event/product-created.event";
import SendFistNotificationyWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-first-notification-when-customer-is-created.handler";
import SendSecondNotificationyWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-second-notification-when-customer-is-created.handler";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import Customer from "../../customer/entity/customer";
import Address from "../../customer/value_objects/adresses";
import ShowChangesInAddressCustomer from "../../customer/event/handler/show-changes-in-address-customer.handler";
import CustomerUpdatedEvent from "../../customer/event/customer-updated.event";

describe("Domain event tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
          1
        );
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
      });
    

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);       
        
    });

    it("should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();


    });

    it("should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        const spyEventHandler = jest.spyOn(eventHandler,"handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });

    it("should send notification when customer is created",() => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendFistNotificationyWhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendSecondNotificationyWhenCustomerIsCreatedHandler();

        const spyEventHandler1 = jest.spyOn(eventHandler1,"handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2,"handle");             
        
        const customer = new Customer("1","Fabio");
        const address = new Address("Street",5000,"99999-999","Fortaleza");
        customer.Address = address;

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            adress: customer.Address
        });

        eventDispatcher.register("CustomerCreatedEvent",eventHandler1);
        
        eventDispatcher.register("CustomerCreatedEvent",eventHandler2);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();

        expect(spyEventHandler2).toHaveBeenCalled();        

    });

    it("should show the changes made to customer adrress", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendFistNotificationyWhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendSecondNotificationyWhenCustomerIsCreatedHandler();
        const eventHandler3 = new ShowChangesInAddressCustomer();           

        const spyEventHandler1 = jest.spyOn(eventHandler3,"handle");
        
        // Create Customer
        const customer = new Customer("1","Fabio");
        const address1 = new Address("Street A",5000,"99999-999","Fortaleza");
        customer.Address = address1;        

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            adress: customer.Address
        });        

        eventDispatcher.register("CustomerCreatedEvent",eventHandler1);       
        eventDispatcher.register("CustomerCreatedEvent",eventHandler2);       

        // Change Address    
        const address2 = new Address("Street B",1000,"55555-555","Piaui");
        customer.changeAddress(address2);

        const customerUpdatedEvent = new CustomerUpdatedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.Address
        });        
      
        eventDispatcher.register("CustomerUpdatedEvent",eventHandler3);       

        eventDispatcher.notify(customerUpdatedEvent);                
        
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeDefined(); 
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(1);   
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler1).toHaveBeenCalledTimes(1);

    });

});