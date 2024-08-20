import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JiraModule } from './jira/jira.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, JiraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const redisClient = new Redis();

    consumer
      .apply(
        session({
          store: new RedisStore({ client: redisClient }),
          // store: new (RedisStore(session))({ client: redisClient }),
          secret: 'your-session-secret',
          resave: false,
          saveUninitialized: false,
          cookie: { secure: false, maxAge: 3600000 }, // 1 hour
        }),
      )
      .forRoutes('*');
  }
}
