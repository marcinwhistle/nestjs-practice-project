import { Injectable } from '@nestjs/common';
import { db, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public getById(id: Product['id']): Product | null {
    return db.products.find((product) => product.id === id);
  }

  public deleteById(id: Product['id']): Product | null {
    const indexToDelete = db.products.findIndex((product) => product.id === id);

    if (indexToDelete !== -1) {
      const deletedProduct = db.products.splice(indexToDelete, 1)[0];
      return deletedProduct;
    } else {
      return null;
    }
  }

  public create(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }

  public updateById(id: Product['id'], productData: Omit<Product, 'id'>): void {
    db.products = db.products.map((product) => {
      if (product.id === id) {
        return { ...product, ...productData };
      }
      return product;
    });
  }
}
