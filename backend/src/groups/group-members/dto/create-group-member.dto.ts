import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateGroupMemberDto {
    @IsNotEmpty()
    name: string
    @IsOptional()
    status: string
}
