import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractApiKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException('缺少 API Key');
    }

    const validApiKey = process.env.API_KEY || 'signal-feed-2025';

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('错误的 API Key');
    }

    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    return (
      (request.headers['x-api-key'] as string) ||
      request.headers['authorization']?.replace('Bearer ', '')
    );
  }
}
