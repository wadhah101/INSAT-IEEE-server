import { Readable } from 'stream';

export const bufferToStream = (binary: Buffer): Readable =>
  new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });
