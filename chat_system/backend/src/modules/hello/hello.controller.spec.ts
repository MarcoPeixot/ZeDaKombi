import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { MongoDBService } from '../../config/mongodb.service'; // Certifique-se de importar o serviço correto

describe('HelloController', () => {
  let app: TestingModule;
  let helloController: HelloController;
  let mockMongoDBService: Partial<MongoDBService>;

  beforeAll(async () => {
    // Criando um mock do MongoDBService
    mockMongoDBService = {
      logToMongo: jest.fn().mockResolvedValue(undefined), // Simula a função logToMongo
    };

    app = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [
        HelloService,
        { provide: MongoDBService, useValue: mockMongoDBService }, // Usa o mock corretamente
      ],
    }).compile();

    helloController = app.get(HelloController);
  });

// testes para o HelloController
describe('HelloController', () => {
  // variáveis que serão usadas nos testes
  let controller: HelloController;
  let helloService: HelloService;
  let mongoDBService: MongoDBService;
  
  // configuração que será executada antes de cada teste
  beforeEach(async () => {
    // Cria mocks para as dependências do controlador
    const helloServiceMock = {
      getHello: jest.fn().mockResolvedValue('Hello World!'),
    };
    const mongoDBServiceMock = {
      logToMongo: jest.fn().mockResolvedValue(undefined),
    };
    // configura o módulo de teste
    const module: TestingModule = await Test.createTestingModule({
      // declara o controlador que vai ser testado
      controllers: [HelloController],
      // fornece versões mockadas das dependências
      providers: [
        { provide: HelloService, useValue: helloServiceMock },
        { provide: MongoDBService, useValue: mongoDBServiceMock },
      ],
    }).compile();
    // Obtém instâncias do controlador e serviços mockados
    controller = module.get<HelloController>(HelloController);
    helloService = module.get<HelloService>(HelloService);
    mongoDBService = module.get<MongoDBService>(MongoDBService);
  });

  // Teste 1: Verifica se o controlador é definido
  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  // Teste 2: Verifica se o método getHello retorna o valor esperado
  it('deve retornar "Hello World!"', async () => {
    // Executa o método do controlador
    const result = await controller.getHello();
    // Verifica se o serviço de log foi chamado
    expect(mongoDBService.logToMongo).toHaveBeenCalledWith({
      message: 'Exemplo de log de acesso a rota hello world',
      level: 'info',
      route: 'GET /',
    });
    // Verifica se o método do serviço foi chamado
    expect(helloService.getHello).toHaveBeenCalled();
    // Verifica se o resultado é o esperado
    expect(result).toEqual('Hello World!');
  });

  it('should log to MongoDB when accessed', async () => {
    // Chama o método do controlador
    await controller.getHello();
    // Verifica se o serviço de log foi chamado com os parâmetros corretos
    expect(mongoDBService.logToMongo).toHaveBeenCalledWith({
      message: 'Exemplo de log de acesso a rota hello world',
      level: 'info',
      route: 'GET /',
    });
  });

  it('should call the service method only once', async () => {
    // Chama o método do controlador
    await controller.getHello();
    // Verifica se o método do serviço foi chamado apenas uma vez
    expect(helloService.getHello).toHaveBeenCalledTimes(1);
  });
});
