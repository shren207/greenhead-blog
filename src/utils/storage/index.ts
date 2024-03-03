import {
  setValueToSessionStorage,
  getValueFromSessionStorage,
} from './sessionStorage'
import {
  setValueToLocalStorage,
  getValueFromLocalStorage,
} from './localStorage'

const SESSION_STORAGE_KEY: string = '__felog_session_storage_key__'
const LOCAL_STORAGE_KEY: string = '__felog_local_storage_key__'

export function getCount(defaultValue: number): number {
  return (
    getValueFromSessionStorage(`${SESSION_STORAGE_KEY}/count`) || defaultValue
  )
}

export function setCount(val: number): void {
  return setValueToSessionStorage(`${SESSION_STORAGE_KEY}/count`, val)
}

export function getData(): any {
  return getValueFromLocalStorage(LOCAL_STORAGE_KEY)
}

export function setData(val: any): void {
  return setValueToLocalStorage(LOCAL_STORAGE_KEY, val)
}

export function getTheme(defaultValue: string): string {
  return getValueFromLocalStorage(`${LOCAL_STORAGE_KEY}/theme`) || defaultValue
}

export function setTheme(val: string): void {
  return setValueToLocalStorage(`${LOCAL_STORAGE_KEY}/theme`, val)
}