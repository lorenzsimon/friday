import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionSummaryDTO } from './dto/response/transaction-summary.dto';
import { TransactionDetailDTO } from './dto/response/transaction-detail.dto';
import { TransactionSummaryQueryDTO } from './dto/request/transaction-summary-query.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Get()
    async findAll(@Query() query: TransactionSummaryQueryDTO): Promise<TransactionSummaryDTO[]> {
        const transactions = await this.transactionsService.findAll(
            query.take,
            query.skip,
            query.reference,
            query.sort,
            query.order,
            query.dateStart,
            query.dateEnd,
            query.category,
            query.currency,
            query.bank,
            query.account,
            query.amountMin,
            query.amountMax
        )
        return transactions.map(trx => TransactionSummaryDTO.from(trx))
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<TransactionDetailDTO> {
        const transaction = await this.transactionsService.findOne(id)
        if (!transaction) throw new NotFoundException()
        return TransactionDetailDTO.from(transaction)
    }
}
