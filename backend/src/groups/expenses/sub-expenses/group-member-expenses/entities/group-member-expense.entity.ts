import Big from "big.js";
import {GroupMemberDto} from "../../../../group-members/dto/group-member.dto";
import {GROUP_MEMBER_EXPENSE_ROLE} from "../dto/group-member-expenses.dto";
import {Expose} from "class-transformer";

export class GroupMemberExpenseEntity {
    @Expose() id: string;
    @Expose() createdAt: Date
    @Expose() updatedAt: Date

    @Expose() amountReferenceCurrency: Big;
    @Expose() currency: string
    @Expose() amount: Big;
    @Expose() role: keyof typeof GROUP_MEMBER_EXPENSE_ROLE;

    @Expose() groupMember: GroupMemberDto;
}
