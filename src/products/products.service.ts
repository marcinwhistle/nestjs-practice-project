import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  public deleteById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.delete({
      where: { id },
    });
    }
  }

  public create(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }

  public updateById(id: Product['id'], productData: Omit<Product, 'id'>): void {
    db.products = db.products.map((p) => {
      if (p.id === id) {
        return { ...p, ...productData };
      }
      return p;
    });
  }
}
