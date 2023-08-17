import {Mapper, Mappings} from "ts-mapstruct";
import {Injectable} from "@nestjs/common";
import {CurrencyRate} from "../entities/currency-rate.entity";

@Injectable()
@Mapper()
export class CurrencyRateMapper {
    @Mappings(
        {target: "rateEurBase", source: "apiRate.rate"}
    )
    entityFromApi(apiRate: ApiRate): CurrencyRate {
        return new CurrencyRate;
    }

    entitiesFromApi(rates: ApiRate[]): CurrencyRate[] {
        return rates.map(currency => this.entityFromApi(currency));
    }
}