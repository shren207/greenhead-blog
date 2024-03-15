import _ from 'lodash';
import { localStorage } from './browser';
import { setValueTo, getValueFrom } from './core';

export const setValueToLocalStorage: (key: string, data: any) => void =
  _.partial(setValueTo, localStorage);
export const getValueFromLocalStorage: (key: string) => any = _.partial(
  getValueFrom,
  localStorage
);
