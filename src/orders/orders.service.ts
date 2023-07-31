import { Injectable } from '@nestjs/common';
import { db, Order, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }
  public getById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }

  public deleteById(id: Order['id']): Order | null {
    const indexToDelete = db.orders.findIndex((order) => order.id === id);

    if (indexToDelete !== -1) {
      const deletedOrder = db.orders.splice(indexToDelete, 1)[0];
      return deletedOrder;
    } else {
      return null;
    }
  }

  public create(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateById(id: Product['id'], orderData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map((order) => {
      if (order.id === id) {
        return { ...order, ...orderData };
      }
      return order;
    });
  }
}
