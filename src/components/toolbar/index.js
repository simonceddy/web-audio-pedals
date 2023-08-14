import { $el } from '../../$e';
import makeAddButton from '../../makeAddButton';
import toolButton from './toolButton';

/**
 * @typedef {object} PedalData
 * @prop {string} name
 * @prop {HTMLDivElement} el
 * @prop {?number} id
 * @prop {?Function} addNext
 * @prop {?Function} onClick
 */

export { default as toolButton } from './toolButton';

function renderButton(el, name, id = 0, addNext = null, onClick = null) {
  const tbbtn = toolButton(`${el.id}-toolbar-button`);
  tbbtn.innerHTML = name;
  tbbtn.classList.add('text-sm', 'h-8', 'col', 'justify-center', 'items-center');
  if (onClick) tbbtn.addEventListener('click', onClick);
  tbbtn.addEventListener('dblclick', () => {
    el.style.top = '10px';
    el.style.left = '10px';
  });
  return [
    tbbtn,
    makeAddButton((factory, key) => {
      if (addNext) addNext(factory, key, id + 1);
    })
  ];
}

export default class Toolbar {
  /** @type {HTMLDivElement} */
  #el;

  /** @type {HTMLDivElement} */
  #signalButtons;

  /**
   *
   * @param {HTMLDivElement} el
   */
  constructor(el) {
    this.#el = el;
    this.#signalButtons = $el('div');
    this.#signalButtons.classList.add(
      'row',
      'w-[85%]',
      'h-full'
    );

    this.#el.append(this.#signalButtons);
  }

  /**
   *
   * @param {PedalData[]} pedals
   * @param {?Function} addFirst
   */
  render(pedals, addFirst = null) {
    const els = pedals.map(({
      el, name, id, addNext, onClick
    }) => renderButton(el, name, id, addNext, onClick)).flat();
    if (addFirst) els.unshift(makeAddButton(addFirst));
    this.#signalButtons.replaceChildren(...els);
  }

  append(...el) {
    this.#el.append(...el);
  }

  appendChild(el) {
    this.#el.appendChild(el);
  }
}
