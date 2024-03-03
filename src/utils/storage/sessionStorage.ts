import _ from 'lodash';
import { setValueTo, getValueFrom } from './core';
import { sessionStorage } from './browser';

export const setValueToSessionStorage: (key: string, data: any) => void = _.partial(setValueTo, sessionStorage);
export const getValueFromSessionStorage: (key: string) => any = _.partial(getValueFrom, sessionStorage);