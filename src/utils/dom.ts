const BODY: string = 'body';

export const getElements = (selector: string): NodeListOf<Element> => document.querySelectorAll(selector);
export const getElement = (selector: string): Element | null => document.querySelector(selector);
export const addClass = (element: Element, className: string): void => element.classList.add(className);
export const removeClass = (element: Element, className: string): void => element.classList.remove(className);
export const hasClass = (element: Element, className: string): boolean => element.classList.contains(className);
export const getBody = (): Element | null => getElement(BODY);
export const addClassToBody = (className: string): void => addClass(getBody() as Element, className);
export const removeClassToBody = (className: string): void => removeClass(getBody() as Element, className);
export const hasClassOfBody = (className: string): boolean => hasClass(getBody() as Element, className);
export const getRect = (className: string): DOMRect | undefined => getElement(className)?.getBoundingClientRect();
export const getPosY = (className: string): number | undefined => getRect(className)?.y;
export const getDocumentHeight = (): number => document.documentElement.offsetHeight;