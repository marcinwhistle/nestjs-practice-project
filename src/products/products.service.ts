import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
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

  public create(productData: any): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  public updateById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }
}
