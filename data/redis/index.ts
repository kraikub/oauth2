import { createClient } from 'redis';

class Redis {
  private client;
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.error('Redis | ', err));
    this.connect()
  }
  public async connect() {
    if (this.client.isReady) {
      return
    }
    await this.client.connect();
  }

  public async get(key: string) {
    await this.connect();
    return await this.client.get(key)
  }

  public async set(key: string, value: string) {
    await this.connect();
    return await this.client.set(key, value)
  }

  public async disconnect() {
    await this.client.disconnect();
  }
}

export const redis = new Redis();