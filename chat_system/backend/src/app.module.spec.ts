import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { HelloModule } from './modules/hello/hello.module';
import { DatabaseService } from './config/database.service';
import { MongoDBModule } from './config/mongodb.module';

// Descreve o grupo de testes para o AppModule
describe('AppModule', () => {
  // Declaração da variável que armazenará a instância do AppModule
  let appModule: AppModule;

  // Antes de cada teste, cria um módulo de teste e compila ele
  beforeEach(async () => {
    // Cria o módulo de teste utilizando o AppModule nos imports
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Obtém a instância do AppModule a partir do módulo de teste compilado
    appModule = moduleRef.get<AppModule>(AppModule);
  });

  // Teste para verificar se o AppModule foi definido corretamente
  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  // Teste para verificar se o AppModule importa o HelloModule
  it('should import HelloModule', async () => {
    // Recupera os metadados dos imports definidos pelo AppModule
    const imports = Reflect.getMetadata('imports', AppModule);
    // Verifica se HelloModule está presente entre os imports
    expect(imports.includes(HelloModule)).toBe(true);
  });

  // Teste para verificar se o AppModule importa o MongoDBModule
  it('should import MongoDBModule', async () => {
    // Recupera os metadados dos imports do AppModule
    const imports = Reflect.getMetadata('imports', AppModule);
    // Verifica se MongoDBModule está presente entre os imports
    expect(imports.includes(MongoDBModule)).toBe(true);
  });

  // Teste para verificar se o DatabaseService é provido pelo AppModule
  it('should provide DatabaseService', async () => {
    // Recupera os metadados dos providers do AppModule
    const providers = Reflect.getMetadata('providers', AppModule);
    // Verifica se DatabaseService está presente entre os providers
    expect(providers.includes(DatabaseService)).toBe(true);
  });

  // Teste para verificar se o DatabaseService é exportado pelo AppModule
  it('should export DatabaseService', async () => {
    // Recupera os metadados das exports do AppModule
    const exports = Reflect.getMetadata('exports', AppModule);
    // Verifica se DatabaseService está presente entre as exports
    expect(exports.includes(DatabaseService)).toBe(true);
  });
});