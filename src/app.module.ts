import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION_DB, CONNECTION_HOST, CONNECTION_PASSWORD, CONNECTION_PORT, CONNECTION_USERNAME } from './config/environment.config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: CONNECTION_HOST,
    port: CONNECTION_PORT,
    username: CONNECTION_USERNAME,
    password: CONNECTION_PASSWORD,
    database: CONNECTION_DB,
    entities: [],
    synchronize: false,
    autoLoadEntities: true,
    migrationsRun: true,
    migrations: ['./dist/core/typeorm/migrations/*.{js,ts}'],
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }
