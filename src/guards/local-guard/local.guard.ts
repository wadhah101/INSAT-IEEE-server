import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const myEnv = this.reflector.get<string>('NODE_ENV', context.getHandler());

    return myEnv ? myEnv === process.env.NODE_ENV : true;
  }
}
