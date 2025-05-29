import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Role, User } from 'prisma/generated/prisma-client';
import { Observable } from 'rxjs';

export const AuthenticatedGuard = (roles: Role[]) => {
  @Injectable()
  class AutheticatedGuardMixin implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const isAuth = request.isAuthenticated();

      if (!isAuth) return false;

      const user = request.user as User;

      if (user.role === Role.ADMIN) return true;

      return roles.includes(user.role);
    }
  }

  const guard = AutheticatedGuardMixin;

  return guard;
};
