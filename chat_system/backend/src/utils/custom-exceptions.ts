import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message = 'Recurso não encontrado') {
    super({ success: false, message }, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'Dados inválidos', errors: any = null) {
    super({ success: false, message, errors }, HttpStatus.BAD_REQUEST);
  }
}
