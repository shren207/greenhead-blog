const win: Window = typeof window !== `undefined` ? window : {} as Window;

export const localStorage: Storage = win.localStorage;
export const sessionStorage: Storage = win.sessionStorage;