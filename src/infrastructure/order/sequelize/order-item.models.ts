import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "../../product/sequelize/product.model";

@Table({tableName: "order_items", timestamps: false})
export default class OrderItemModel extends Model{

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(()=> ProductModel)
    @Column({allowNull: false})
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare produuct: ProductModel

    @ForeignKey(() => OrderModel)
    @Column({allowNull : false})
    declare order_id: string;
    
    @ForeignKey(() => OrderModel)
    declare order: OrderModel

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull : false})
    declare price: number;
}