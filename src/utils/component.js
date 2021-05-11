import AbstractComponentView from '../view/abstract/companent.js';

export const createElement = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;

  return container.firstChild;
};

export const render = (element, container, position = 'beforeend') => {
  if (element instanceof AbstractComponentView) {
    element = element.getElement();
  }

  if (container instanceof AbstractComponentView) {
    container = container.getElement();
  }

  if (position === 'beforeend') {
    container.append(element);
  }

  if (position === 'afterbegin') {
    container.prepend(element);
  }
};

export const remove = (component) => {
  if (component === null) {
    return;
  }
  const element = component.getElement();
  component.removeElement();
  element.parentNode.removeChild(element);
};

export const replace = (newElement, oldElement) => {
  if (newElement instanceof AbstractComponentView) {
    newElement = newElement.getElement();
  }

  if (oldElement instanceof AbstractComponentView) {
    oldElement = oldElement.getElement();
  }

  const container = oldElement.parentNode;

  container.replaceChild(newElement, oldElement);
};
