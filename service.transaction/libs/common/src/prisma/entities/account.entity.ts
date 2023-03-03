import { Account } from '@prisma/client';

export class AccountEntity implements Account {
    id: string;
    name: string | null;
    bank: string | null;
}
