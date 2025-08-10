import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response as ExpressResponse } from 'express';

export interface Response<T> {
  data: T;
  success: boolean;
  message?: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse<ExpressResponse>();

    response.status(200);

    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        data: data as T,
      })),
      catchError((error: Error) => {
        console.log('error', error);

        if (error && error.message) {
          return Promise.resolve({
            success: false,
            data: null,
            message: error.message,
          });
        }

        return throwError(() => ({
          success: false,
          data: null,
          message: '服务器内部错误',
        }));
      }),
    );
  }
}
