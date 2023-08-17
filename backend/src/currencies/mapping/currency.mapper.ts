import {Mapper, Mappings} from "ts-mapstruct";
import {CurrencyDto} from "../dto/currency.dto";
import {Currency} from "../entities/currency.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
@Mapper()
export class CurrencyMapper {
    @Mappings()
    dtoFromEntity(currency: Currency): CurrencyDto {
        return new CurrencyDto();
    }

    dtosFromEntities(currencies: Currency[]): CurrencyDto[] {
        return currencies.map(currency => this.dtoFromEntity(currency));
    }

    @Mappings()
    entityFromApi(currency: ApiCurrency): Currency {
        return new Currency();
    }

    entitiesFromApi(apiCurrencies: ApiCurrency[]): Currency[] {
        return apiCurrencies.map(currency => this.entityFromApi(currency));
    }
}