import _ from 'lodash';
import { sessionStorage } from './browser';
import { setValueTo, getValueFrom } from './core';

export const setValueToSessionStorage: (key: string, data: any) => void =
  _.partial(setValueTo, sessionStorage);
export const getValueFromSessionStorage: (key: string) => any = _.partial(
  getValueFrom,
  sessionStorage
);
