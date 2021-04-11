import type { HostAddress } from '../../utils';
import type { ConnectionOptions } from '../connection';
import { TransportClient } from './generated/mongodb_grpc_pb';
import { Message } from './generated/mongodb_pb';
import { Duplex } from 'stream';
import type { SocketLike } from '../connect';
import * as grpc from '@grpc/grpc-js';

const kEstablished = Symbol('established');
export class GrpcTransport extends TransportClient {
  [kEstablished]: boolean;

  // eslint-disable-next-line
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object) {
    super(address, credentials, options);
    this[kEstablished] = false;
  }
}

/** @internal **/
interface GrpcStreamOptions extends ConnectionOptions {
  lcid: string;
}

export class GrpcStream extends Duplex implements SocketLike {
  private timeout: number | undefined;
  private hostAddress: HostAddress;
  readonly remoteAddress?: string;
  readonly remotePort?: number;
  readonly transport: GrpcTransport;
  readonly lcid: string;

  constructor(options: GrpcStreamOptions) {
    super();
    this.hostAddress = options.hostAddress;
    this.remoteAddress = this.hostAddress.host;
    this.remotePort = this.hostAddress.port;

    // eslint-disable-next-line
    this.transport = options.grpcTransport!;
    this.lcid = options.lcid;
  }

  get needsHandshake(): boolean {
    // eslint-disable-next-line
    return this.transport[kEstablished] === false;
  }

  handshakeCompleted(): void {
    this.transport[kEstablished] = true;
  }

  address(): any {
    return this.hostAddress;
  }

  setTimeout(timeout: number, callback?: () => void): this {
    this.timeout = timeout;
    if (callback) callback();
    return this;
  }

  _read(/* size: number */): void {
    // NOTE: This implementation is empty because we explicitly push data to be read
    //       when `sendMessage` completes.
    return;
  }

  _write(
    chunk: Uint8Array,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    const message = new Message();
    message.setPayload(chunk);

    const metadata = new grpc.Metadata();
    metadata.add('lcid', this.lcid);

    this.transport.sendMessage(message, metadata, (err, response) => {
      if (err || !response) {
        // console.dir({ err, destroyed: this.destroyed, chunk });
        return callback(err);
      }

      this.push(response.getPayload() as Buffer);
      callback();
    });
  }

  setNoDelay(/* noDelay?: boolean */): this {
    return this;
  }

  setKeepAlive(/* enable?: boolean, initialDelay?: number */): this {
    return this;
  }
}
