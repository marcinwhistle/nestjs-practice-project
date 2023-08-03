import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({ include: { product: true } });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  public deleteById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(orderData: any): Promise<Order> {
    const { productId, ...otherData } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
    }
  }

  public updateById(id: Order['id'], orderData: any): Promise<Order> {
    const { productId, ...otherData } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
        },
      },
    });
  }
}
