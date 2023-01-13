import { Adress } from "@prisma/client";
import { Address } from "../../../Domain/Adress/Adress";

export class AdressMapper {
  static ToDomainEntities(entities: Adress[]): Address[] {
    var address: Address[] = [];

    for (const entity of entities) {
      const result = AdressMapper.ToDomain(entity);
      address.push(result);
    }

    return address;
  }

  static ToDomain(entity: Adress): Address {
    return {
      id: entity.Id,
      adress: entity.adressName,
      country: entity.Country,
      codePostal: entity.postalCode,
      city: entity.city,
    };
  }
}
