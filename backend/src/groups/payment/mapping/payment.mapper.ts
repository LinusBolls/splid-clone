import { Mapper, Mappings } from 'ts-mapstruct';
import { Injectable } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { PaymentDto } from '../dto/payment.dto';
import { PaymentEntity } from '../entities/payment.entity';

@Injectable()
@Mapper()
export class PaymentMapper {
  @Mappings()
  dtoFromEntity(payment: PaymentEntity): PaymentDto {
    return new PaymentDto();
  }

  dtosFromEntities(payments: PaymentEntity[]): PaymentDto[] {
    return payments.map((payment) => this.dtoFromEntity(payment));
  }

  @Mappings()
  entityFromDb(payment: Payment): PaymentEntity {
    return new PaymentEntity();
  }

  entitiesFromDb(payments: Payment[]): PaymentEntity[] {
    return payments.map((payment) => this.entityFromDb(payment));
  }

  @Mappings()
  categoryEnhancedEntityFromDb(payment: EnhancedPayment): PaymentEntity {
    return new PaymentEntity();
  }

  categoryEnhancedEntitiesFromDb(payments: EnhancedPayment[]): PaymentEntity[] {
    return payments.map((payment) =>
      this.categoryEnhancedEntityFromDb(payment),
    );
  }
}

const enhancedPayment = Prisma.validator<Prisma.PaymentDefaultArgs>()({
  include: {
    sender: true,
    receiver: true,
    group: true,
  },
});

type EnhancedPayment = Prisma.PaymentGetPayload<typeof enhancedPayment>;
