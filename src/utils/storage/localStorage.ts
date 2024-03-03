import _ from 'lodash';
import { setValueTo, getValueFrom } from './core';
import { localStorage } from './browser';

export const setValueToLocalStorage: (key: string, data: any) => void = _.partial(setValueTo, localStorage);
export const getValueFromLocalStorage: (key: string) => any = _.partial(getValueFrom, localStorage);