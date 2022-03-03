import { SetMetadata } from '@nestjs/common';
import { Role } from '../user/entity/role.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);