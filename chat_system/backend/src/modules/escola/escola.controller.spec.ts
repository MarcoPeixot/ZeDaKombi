import { Test, TestingModule } from '@nestjs/testing';
import { EscolaController } from './escola.controller';
import { EscolaService } from './escola.service';

// Bloco principal de testes para o EscolaController
describe('EscolaController', () => {
  let controller: EscolaController;
  let service: EscolaService;

  // Configuração que será executada antes de cada teste
  beforeEach(async () => {
    // Criação de um módulo de teste usando o TestingModule do NestJS
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscolaController], // Registra o controlador a ser testado
      providers: [
        {
          provide: EscolaService, // Fornece uma implementação mockada do EscolaService
          useValue: {
            // Mock de todos os métodos do serviço que serão usados nos testes
            getAllEscolas: jest.fn(),
            getEscolaById: jest.fn(),
            getProfissionaisByEscola: jest.fn(),
            getEquipamentosByEscola: jest.fn(),
          },
        },
      ],
    }).compile(); // Compila o módulo de teste

    // Obtém as instâncias do controlador e serviço para uso nos testes
    controller = module.get<EscolaController>(EscolaController);
    service = module.get<EscolaService>(EscolaService);
  });

  // Teste básico para verificar se o controlador foi instanciado corretamente
  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  // Grupo de testes para o método getAllEscolas
  describe('getAllEscolas', () => {
    // Teste para verificar se o método retorna corretamente a lista de escolas
    it('deve retornar um array de escolas', async () => {
      // Mock dos dados que serão retornados pelo serviço
      const mockEscolas = [{ id: 1, nome: 'Escola A' }];
      // Configura o spy para o método getAllEscolas retornar o mock
      jest.spyOn(service, 'getAllEscolas').mockResolvedValue(mockEscolas);

      // Executa o método do controlador que está sendo testado
      const result = await controller.getAllEscolas();
      // Verifica se o resultado é igual ao mock esperado
      expect(result).toEqual(mockEscolas);
      // Verifica se o método do serviço foi chamado
      expect(service.getAllEscolas).toHaveBeenCalled();
    });
  });

  // Grupo de testes para o método getEscolaById
  describe('getEscolaById', () => {
    // Teste para verificar se o método retorna a escola correta quando encontrada
    it('deve retornar uma escola quando encontrada', async () => {
      // Mock da escola que será retornada pelo serviço
      const mockEscola = { id: 1, nome: 'Escola A' };
      // Configura o spy para o método getEscolaById retornar o mock
      jest.spyOn(service, 'getEscolaById').mockResolvedValue(mockEscola);

      // Executa o método do controlador com o ID 1
      const result = await controller.getEscolaById(1);
      // Verifica se o resultado é igual ao mock esperado
      expect(result).toEqual(mockEscola);
      // Verifica se o método do serviço foi chamado com o ID correto
      expect(service.getEscolaById).toHaveBeenCalledWith(1);
    });
  });

  // Grupo de testes para o método getProfissionaisByEscola
  describe('getProfissionaisByEscola', () => {
    // Teste para verificar se o método retorna os profissionais da escola corretamente
    it('deve retornar um array de profissionais da escola', async () => {
      // Mock dos profissionais que serão retornados pelo serviço
      const mockProfissionais = [{ id: 1, nome: 'Profissional A' }];
      // Configura o spy para o método getProfissionaisByEscola retornar o mock
      jest.spyOn(service, 'getProfissionaisByEscola').mockResolvedValue(mockProfissionais);

      // Executa o método do controlador com o ID 1
      const result = await controller.getProfissionaisByEscola(1);
      // Verifica se o resultado é igual ao mock esperado
      expect(result).toEqual(mockProfissionais);
      // Verifica se o método do serviço foi chamado com o ID correto
      expect(service.getProfissionaisByEscola).toHaveBeenCalledWith(1);
    });
  });

  // Grupo de testes para o método getEquipamentosByEscola
  describe('getEquipamentosByEscola', () => {
    // Teste para verificar se o método retorna os equipamentos da escola corretamente
    it('deve retornar um array de equipamentos da escola', async () => {
      // Mock dos equipamentos que serão retornados pelo serviço
      const mockEquipamentos = [{ id: 1, nome: 'Equipamento A' }];
      // Configura o spy para o método getEquipamentosByEscola retornar o mock
      jest.spyOn(service, 'getEquipamentosByEscola').mockResolvedValue(mockEquipamentos);

      // Executa o método do controlador com o ID 1
      const result = await controller.getEquipamentosByEscola(1);
      // Verifica se o resultado é igual ao mock esperado
      expect(result).toEqual(mockEquipamentos);
      // Verifica se o método do serviço foi chamado com o ID correto
      expect(service.getEquipamentosByEscola).toHaveBeenCalledWith(1);
    });
  });
});