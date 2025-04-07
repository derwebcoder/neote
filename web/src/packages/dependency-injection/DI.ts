import { Dependencies } from "./Dependencies";

export class DI {
  private static listenerAsync: (<D extends keyof Dependencies>(
    key: D,
    value: Dependencies[D],
  ) => void)[] = [];
  private static dependencies: Dependencies;

  private constructor() {}

  static inject<D extends keyof Dependencies>(key: D, value: Dependencies[D]) {
    if (!DI.dependencies) {
      DI.dependencies = {} as Dependencies;
    }
    DI.dependencies[key] = value;

    DI.listenerAsync.forEach((listener) => listener(key, value));
  }

  static resolve<D extends keyof Dependencies>(key: D): Dependencies[D] {
    if (!DI.dependencies?.[key]) {
      throw new Error(`Dependency ${key} not found`);
    }
    return DI.dependencies[key];
  }

  static async resolveAsync<D extends keyof Dependencies>(
    key: D,
  ): Promise<Dependencies[D]> {
    const { promise, resolve, reject } =
      Promise.withResolvers<Dependencies[D]>();

    if (DI.dependencies?.[key]) {
      resolve(DI.dependencies[key]);
      return promise;
    }

    const listener = (updatedKey: D, value: Dependencies[D]) => {
      if (updatedKey === key) {
        resolve(value as Dependencies[D]);
      }
    };

    // could not figure out how to type this correctly for now
    DI.listenerAsync.push(listener as (typeof DI.listenerAsync)[0]);

    window.setTimeout(() => {
      reject(new Error(`Dependency ${key} not found after 1s.`));
    }, 1000);

    return promise;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).DI = DI;
