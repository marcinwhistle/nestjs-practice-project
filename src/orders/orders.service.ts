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
      include: { product: true, client: true },
    });
  }

  public deleteById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(orderData: any): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;
    try {
      const existProduct = await this.prismaService.product.findUnique({
        where: { id: productId },
      });
      if (!existProduct) {
        throw new BadRequestException("Product doesn't exist");
      }
      const existClient = await this.prismaService.client.findUnique({
        where: { id: clientId },
      });
      if (!existClient) {
        throw new BadRequestException("Client doesn't exist");
      }

      return await this.prismaService.order.create({
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  public updateById(id: Order['id'], orderData: any): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
          client: {
            connect: { id: clientId },
          },
        },
      },
    });
  }
}
