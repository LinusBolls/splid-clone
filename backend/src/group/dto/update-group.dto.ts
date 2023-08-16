import { OmitType } from "@nestjs/mapped-types";
import {CreateGroupDto} from "./create-group.dto";

export class UpdateGroupDto extends OmitType(CreateGroupDto, ["currency"] as const){}