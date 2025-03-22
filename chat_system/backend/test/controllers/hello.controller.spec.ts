import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from 'src/modules/hello/hello.controller';
import { HelloService } from 'src/modules/hello/hello.service';

describe('HelloController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const helloController = app.get(HelloController);
      expect(helloController.getHello()).toBe('Hello World!');
    });
  });
});
