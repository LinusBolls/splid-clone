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
    Put,
    Query
} from '@nestjs/common';
import {GroupService} from './groups.service';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';

@Controller('groups')
export class GroupController {
    constructor(private readonly groupService: GroupService) {
    }

    @Post()
    create(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.create(createGroupDto);
    }

    @Get()
    findAllByInviteCode(@Query('inviteCode') inviteCode: string) {
        if (inviteCode === undefined) {
            throw new HttpException('inviteCode has to be set', HttpStatus.BAD_REQUEST);
        }

        return this.groupService.findAllByInviteCode(inviteCode);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.groupService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
        return this.groupService.update(id, updateGroupDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.groupService.remove(id);
    }
}
