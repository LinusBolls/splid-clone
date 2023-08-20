import Big from "big.js";
import {Group} from "@prisma/client";
import {GroupMemberEntity} from "../../group-members/entities/group-member.entity";
import {Expose} from "class-transformer";

export class PaymentEntity {
    @Expose() id: string
    @Expose() createdAt: Date;
    @Expose() updatedAt: Date;

    @Expose() amountReferenceCurrency: Big;
    @Expose() currency: string;
    @Expose() amount: Big;
    @Expose() date: Date;

    @Expose() sender: GroupMemberEntity;
    @Expose() receiver: GroupMemberEntity;
    @Expose() group: Group//TODO entity
}
