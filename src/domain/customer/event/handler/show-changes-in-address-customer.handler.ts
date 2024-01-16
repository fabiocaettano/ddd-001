import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class ShowChangesInAddressCustomer implements EventHandlerInterface<CustomerUpdatedEvent>{

    handle(event: CustomerUpdatedEvent): void {        
        console.log(`Endereço do Cliente: ${event.eventData.id} , ${event.eventData.name}, Alterado para Street: ${event.eventData.address._street} , Number: ${event.eventData.address._number} , ZipCode: ${event.eventData.address._zipcode} , City: ${event.eventData.address._city}`);        
    }
}