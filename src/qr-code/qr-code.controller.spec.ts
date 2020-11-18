import { Test, TestingModule } from '@nestjs/testing';
import { QrCodeController } from './qr-code.controller';
import { QrCodeService } from './qr-code.service';

describe('QrCodeController', () => {
  let controller: QrCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrCodeController],
      providers: [QrCodeService],
    }).compile();

    controller = module.get<QrCodeController>(QrCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
