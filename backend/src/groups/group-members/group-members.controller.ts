import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { GroupsService } from '../groups.service';

@Controller('/groups/:groupId/group-members')
export class GroupMembersController {
  constructor(
    private readonly groupMembersService: GroupMembersService,
    private groupsService: GroupsService,
  ) { }

  @Post()
  async create(
    @Body() createGroupMemberDto: CreateGroupMemberDto,
    @Param('groupId') groupId: string,
  ) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.groupMembersService.create(createGroupMemberDto, groupId);
  }

  @Get()
  async findAll(@Param('groupId') groupId: string) {
    if (!(await this.groupsService.exists(groupId))) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    return this.groupMembersService.findAll(groupId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param('groupId') groupId: string) {
    const findResult = await this.groupMembersService.findOne(id, groupId);

    if (findResult === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return findResult;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Param('groupId') groupId: string) {
    const deletionResult = await this.groupMembersService.remove(id, groupId);

    if (deletionResult === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
