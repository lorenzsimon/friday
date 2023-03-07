import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Max, IsOptional, IsString, IsDate, IsIn } from "class-validator";

export class TransactionSummaryQueryDTO {

    @IsInt()
    @Max(1000)
    @Type(() => Number)
    @ApiProperty({
        description: 'The amount of transactions to take',
        maximum: 1000,
        required: true,
        type: Number,
    })
    readonly take: number = 100

    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        description: 'The amount of transaction to skip',
        required: true,
        type: Number
    })
    readonly skip: number = 0

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'The transaction reference query string',
        required: false,
        type: String
    })
    readonly reference?: string

    @IsOptional()
    @IsIn(['amount', 'date'])
    @ApiProperty({
        description: 'The name of the sorting field',
        required: false,
        type: String
    })
    readonly sort?: 'amount' | 'date'

    @IsOptional()
    @IsIn(['asc', 'desc'])
    @ApiProperty({
        description: 'The order of the sort',
        required: false,
        type: String
    })
    readonly order?: 'asc' | 'desc'

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        description: 'The start date of the date range',
        required: false,
        type: Date
    })
    readonly dateStart?: Date 

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        description: 'The end date of the date range',
        required: false,
        type: Date
    })
    readonly dateEnd?: Date

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'The name of the category',
        required: false,
        type: String
    })
    readonly category?: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'The currency of the amonut',
        required: false,
        type: String
    })
    readonly currency?: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'The name of the bank',
        required: false,
        type: String
    })
    readonly bank?: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'The name of the account',
        required: false,
        type: String
    })
    readonly account?: string

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        description: 'The minimum of the amount range',
        required: false,
        type: Number
    })
    readonly amountMin?: number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({
        description: 'The maximum of the amount range',
        required: false,
        type: Number
    })
    readonly amountMax?: number
}
