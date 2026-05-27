import { customRef } from "vue";

export function useDebouncedRef<T>(value: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(newValue: T) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        value = newValue;
        trigger();
      }, delay);
    },
  }));
}
