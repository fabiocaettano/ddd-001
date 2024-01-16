import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendSecondNotificationyWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>{

    handle(event: CustomerCreatedEvent): void {
        console.log(`Send second notification  ....`);
    }
}