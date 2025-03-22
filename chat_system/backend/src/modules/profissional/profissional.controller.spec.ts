import { Test } from '@nestjs/testing';
import { ProfissionalController } from '../profissional/profissional.controller';
import { ProfissionalService } from '../profissional/profissional.service';

describe('ProfissionalController (Unit)', () => {
  let profissionalController: ProfissionalController;
  let profissionalService: ProfissionalService;

  beforeEach(async () => {
    const mockProfissionalService = {
      getAllProfissionais: jest.fn().mockResolvedValue([
        {
          id: 1,
          nome: 'Dr. Carlos Mendes',
          especialidade: 'Fisioterapeuta',
          contato: 'carlos@example.com',
        },
        {
          id: 2,
          nome: 'Dra. Ana Lima',
          especialidade: 'Psicóloga',
          contato: 'ana@example.com',
        },
      ]),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [ProfissionalController],
      providers: [{ provide: ProfissionalService, useValue: mockProfissionalService }],
    }).compile();

    profissionalController = moduleRef.get<ProfissionalController>(ProfissionalController);
  });

  it('should return an array of professionals', async () => {
    const result = await profissionalController.getAllProfissionais();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        id: 1,
        nome: 'Dr. Carlos Mendes',
        especialidade: 'Fisioterapeuta',
        contato: 'carlos@example.com',
      },
      {
        id: 2,
        nome: 'Dra. Ana Lima',
        especialidade: 'Psicóloga',
        contato: 'ana@example.com',
      },
    ]);
  });
});