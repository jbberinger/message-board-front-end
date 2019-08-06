export const throttle = (delay: number, fn: any): any => {
  let lastCall: number = 0;
  return (...args: any[]) => {
    const now: number = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

export const debounce = (delay: number, fn: any): any => {
  let timerId: ReturnType<typeof setTimeout> | null;
  return (...args: any[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};
