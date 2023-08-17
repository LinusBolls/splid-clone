import {IsDate, IsNumber, IsOptional, Length} from "class-validator";
import {Type} from "class-transformer";

export class ConvertCurrencyRequestDto {
    @Length(3,3)
    from: string
    @Length(3,3)
    to: string
    @IsNumber()
    amount: number
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date: Date
}