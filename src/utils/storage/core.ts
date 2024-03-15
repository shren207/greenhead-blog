function isEmpty(storage: Storage | null): storage is null {
  return !storage || Object.keys(storage).length === 0;
}

export function getValueFrom(storage: Storage | null, key: string): any {
  if (isEmpty(storage)) {
    return;
  }
  const rawData = storage.getItem(key);

  if (!rawData) {
    return;
  }
  return JSON.parse(rawData);
}

export function setValueTo(
  storage: Storage | null,
  key: string,
  data: any
): void {
  if (isEmpty(storage)) {
    return;
  }
  return storage.setItem(key, JSON.stringify(data));
}
