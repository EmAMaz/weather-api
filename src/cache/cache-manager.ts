import { createClient } from "redis";

type CacheValue = Record<string, unknown> | string | number | boolean;

export class CacheManager {
  private readonly client;
  constructor(url: string) {
    this.client = createClient({ url });
  }

  private async connectIfNecessary(): Promise<void> {
    if (this.client.isReady) {
      return;
    }

    await this.client.connect();
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.connectIfNecessary();
      await this.client.ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  async set(key: string, value: CacheValue, options: {expirationMs?: number} = {}): Promise<void> {
    await this.connectIfNecessary(); 

    const valueToStore = typeof value === "string" ? value : JSON.stringify(value);

    await this.client.set(key, valueToStore, {PX: options.expirationMs});
  }

  async get(key: string): Promise<CacheValue | null> {
    await this.connectIfNecessary();

    const value = await this.client.get(key);

    if (!value) {    
      return null;
    }

    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
  }
}
