import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RequestMethod, VersioningType } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Global prefix
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'heath', method: RequestMethod.GET }]
  })

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  // for frontend integration
  app.enableCors()

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Todos')
    .setDescription('REST aPI for Todo app')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
