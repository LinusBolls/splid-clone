import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class GroupService {
    create(createGroupDto: CreateGroupDto) {
        return prisma.group.create({
                data: {
                    ...createGroupDto,
                    inviteCode: this.generateInviteCode()
                }
            }
        );
    }

    findOne(id: string) {
        return prisma.group.findFirst({
            where: {
                id
            }
        });
    }

    findAllByInviteCode(inviteCode: string) {
        return prisma.group.findMany({
            where: {
                inviteCode
            }
        });
    }

    update(id: string, updateGroupDto: UpdateGroupDto) {
        return prisma.group.update({
            where: {
                id
            }, data: updateGroupDto
        });
    }

    async remove(id: string) {
        try {
            await prisma.group.delete({
                where: {
                    id
                }
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
                throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            }
        }
        //TODO: recursively delete all foreign-keyed fields (expenses + groupMembers)
    }

    private generateInviteCode() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;

        while (counter < 9) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        return result;
    }
}