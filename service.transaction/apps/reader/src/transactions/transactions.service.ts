import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return `This action returns all transactions`;
  }

  async findOne(id: string) {
    return await this.prismaService.transaction.findFirst({ where: {id} });
  }
}
