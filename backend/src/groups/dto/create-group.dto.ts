import { IsNotEmpty, Length } from 'class-validator';
export class CreateGroupDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @Length(3, 3)
  currency: string;
}
