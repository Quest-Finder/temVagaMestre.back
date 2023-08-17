import { Module } from '@nestjs/common';
import { PlayerController } from './controller/PlayerController';
import { PlayerService } from './service/PlayerService';
import { PlayerDatabase } from './database/PlayerDatabase';
import { IdGenerator } from './externalServices/IdGenerator';
import { Authenticator } from './externalServices/Authenticator';
import { HashManager } from './externalServices/HashManager';
import { PlayerRepository } from './models/PlayerRepository';
import { IHashManager } from './models/IHashManager';
import { IAuthenticator } from './models/IAuthenticator';
import { IIdGenerator } from './models/IIdGenerator';
import { DatabaseConfig } from './models/DatabaseConfig';
import { TestDatabaseConfig } from './config/TestDatabaseConfig';
import { ProdDatabaseConfig } from './config/ProdDatabaseConfig';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    {
      provide: PlayerRepository,
      useClass: PlayerDatabase,
    },
    {
      provide: DatabaseConfig,
      useClass:
        process.env.NODE_ENV === 'test'
          ? TestDatabaseConfig
          : ProdDatabaseConfig,
    },
    {
      provide: IHashManager,
      useClass: HashManager,
    },
    {
      provide: IAuthenticator,
      useClass: Authenticator,
    },
    {
      provide: IIdGenerator,
      useClass: IdGenerator,
    },
  ],
})
export class AppModule {}
