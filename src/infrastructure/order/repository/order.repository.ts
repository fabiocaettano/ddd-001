import Order from "../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import OrderItem from "../../../domain/checkout/entity/order_item";
import OrderItemModel from "../sequelize/order-item.models";
import OrderModel from "../../order/sequelize/order.model";

export default class OrderRepository implements OrderRepositoryInterface{
    
  async create(entity: Order): Promise<void> {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        });
   }

  async update(entity: Order): Promise<void>{
      await OrderModel.update(
        {
          total: entity.total(),
          items: entity.items.map((item) => ({
             quantity: item.quantity 
          })),
        },
        {
          where : {
            id: entity.id, 
          }
        },
      )
    }    

    async find(id: string):Promise<Order>{
      
      const orderModel = await OrderModel.findOne({ where : { id }, include: { model: OrderItemModel }});
      
      return new Order(orderModel.id, orderModel.customer_id,
         orderModel.items.map((item) => new OrderItem(
          item.id,item.name,item.price,item.product_id,item.quantity)));
    }

    async findAll():Promise<Order[]>{
            
      const orderModels = await OrderModel.findAll({        
        include: {
          model: OrderItemModel
        }
      });
      
      return orderModels.map(
        (orderModels) => new Order(
          orderModels.id, 
          orderModels.customer_id,           
          orderModels.items.map( item => new OrderItem(item.id, item.name,item.price, item.product_id, item.quantity)),          
      ));      
    }
  }