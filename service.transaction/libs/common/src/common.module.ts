import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DomainModule } from './domain/domain.module';

@Module({
    exports: [PrismaModule, DomainModule],
    imports: [PrismaModule, DomainModule]
})
export class CommonModule { }
