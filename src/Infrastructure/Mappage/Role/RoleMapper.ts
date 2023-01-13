import { Roles } from "../../../Domain/Role/Role";
import { Role } from "@prisma/client";

export class RoleMapper {
  static ToDomain(entity: Role): Roles {
    return {
      id: entity.Id,
      label: entity.Label,
      isDisable: entity.IsDisabled,
    };
  }
}
