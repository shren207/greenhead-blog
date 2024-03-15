interface Condition {
  (): boolean;
}

interface Callback {
  (): any;
}

interface Options {
  dismissCondition?: Condition;
  triggerCondition?: Condition;
}

export function toFit(
  cb: Callback,
  { dismissCondition = () => false, triggerCondition = () => true }: Options
): () => void {
  if (!cb) {
    throw Error('Invalid required arguments');
  }

  let tick = false;

  return function () {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      }

      if (triggerCondition()) {
        tick = false;
        return cb();
      }
    });
  };
}
