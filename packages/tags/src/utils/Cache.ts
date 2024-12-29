export type Listener = <KEY, VALUE>(
  key: KEY,
  oldValue: VALUE | undefined,
  newValue: VALUE,
) => void;

export abstract class Cache<KEY, VALUE> {
  private listeners: Array<Listener> = [];
  private cache: Map<KEY, VALUE> = new Map();

  public get(key: KEY) {
    if (!this.cache.has(key)) {
      this.cache.set(key, this.default(key));
    }
    return this.cache.get(key)!;
  }

  public update(key: KEY, value: VALUE) {
    const oldValue = this.cache.get(key);
    this.cache.set(key, value);

    this.listeners.forEach((listener) => {
      listener(key, oldValue, value);
    });
  }

  public listen(listener: Listener) {
    this.listeners.push(listener);
  }

  public unlisten(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  public abstract default(key: KEY): VALUE;
}
