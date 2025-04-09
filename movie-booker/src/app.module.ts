import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
      username: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? 'postgres',
      database: process.env.POSTGRES_DB ?? 'movie_booker',
      
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Reservation]),

    UsersModule,
    AuthModule,
    MoviesModule,
    ReservationModule,
  ],
})
export class AppModule {}
