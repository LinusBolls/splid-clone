import {Injectable} from '@nestjs/common';
import {CreateGroupMemberDto} from './dto/create-group-member.dto';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class GroupMembersService {
    create(createGroupMemberDto: CreateGroupMemberDto, groupId: string) {

        return prisma.groupMember.create({
            data: {
                ...createGroupMemberDto,
                groupId
            },
        });
    }

    findAll(groupId: string) {
        return prisma.groupMember.findMany({
            where: {
                groupId
            },
        });
    }

    findOne(id: string, groupId: string) {
        return prisma.groupMember.findFirst({
            where: {
                id,
                groupId
            },
        });
    }

    async remove(id: string, groupId: string) {
        const queryResult = await prisma.groupMember.findFirst({
            where: {
                id,
                groupId
            },
        });

        if (queryResult === null) {
            return null
        }

        await prisma.groupMemberPaymentDetail.deleteMany({
            where: {
                groupMemberId: id
            },
        });

        return prisma.groupMember.delete({
            where: {
                id
            },
        });
    }
}
