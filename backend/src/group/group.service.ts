import {Injectable} from '@nestjs/common';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {PrismaClient} from '@prisma/client'
import * as dayjs from 'dayjs'

const prisma = new PrismaClient()

@Injectable()
export class GroupService {
    async create(createGroupDto: CreateGroupDto) {
        return prisma.group.create({
                data: {
                    ...createGroupDto,
                    createdAt: dayjs().toDate()
                }
            }
        );
    }

    findAll() {
        return `This action returns all group`;
    }

    findOne(id: number) {
        return `This action returns a #${id} group`;
    }

    update(id: number, updateGroupDto: UpdateGroupDto) {
        return `This action updates a #${id} group`;
    }

    remove(id: number) {
        return `This action removes a #${id} group`;
    }
}
