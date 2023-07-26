import { Injectable } from '@nestjs/common';
import { db, Product } from './../db';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public getById(id: Product['id']): Product | null {
    return db.products.find((p) => p.id === id);
  }

  public deleteById(id: Product['id']): Product | null {
    const indexToDelete = db.products.findIndex((p) => p.id === id);

    if (indexToDelete !== -1) {
      const deletedProduct = db.products.splice(indexToDelete, 1)[0];
      return deletedProduct;
    } else {
      return null;
    }
  }
}
