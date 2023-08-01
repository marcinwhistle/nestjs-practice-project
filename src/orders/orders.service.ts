import { Injectable } from '@nestjs/common';
import { db, Order, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  public deleteById(id: Order['id']): Order | null {
    const indexToDelete = db.orders.findIndex((o) => o.id === id);

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
    db.orders = db.orders.map((o) => {
      if (o.id === id) {
        return { ...o, ...orderData };
      }
      return o;
    });
  }
}
