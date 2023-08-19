import { IsNotEmpty, IsOptional, Length } from 'class-validator';
export class CreateGroupDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description: string;
  @Length(3, 3)
  currency: string;
}
