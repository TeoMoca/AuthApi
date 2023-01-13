import { Order } from "@prisma/client";
import { Orders } from "../../../Domain/Orders/Orders";

export class OrdersMapper {
    static ToDomainEnities(entities: Order[]): Orders[]{
        var orders: Orders[] = [];

        for(const entity of entities){
            const result = OrdersMapper.ToDomain(entity);
            orders.push(result);
        }

        return orders;
    }

    static ToDomain(entity:Order): Orders{
        return {
            id: entity.Id,
            userId: entity.Id_User,
            facturation: entity.Facturation,
            delivery: entity.DeliveryAdress
        };
    }
}