import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodosModule } from './modules/todos/todos.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true // enables ${VAR} interpolation
    }),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
