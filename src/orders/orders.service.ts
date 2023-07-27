import { Injectable } from '@nestjs/common';
import { db, Orders } from './../db';

@Injectable()
export class OrdersService {
  public getAll(): Orders[] {
    return db.orders;
  }
  public getById(id: Orders['id']): Orders | null {
    return db.orders.find((p) => p.id === id);
  }
}
