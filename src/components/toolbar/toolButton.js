import { $el } from '../../$e';

export default function toolButton(id = 'toolbar-button') {
  /** @type {HTMLButtonElement} */
  const el = $el('button');
  el.id = id;
  el.type = 'button';
  el.classList.add(
    'border',
    'hover:border-lime-400',
    'active:border-green-400',
    'border-slate-400',
    'p-1',
    'hover:underline',
    'active:decoration-dotted',
    'capitalize',
    'active:bg-green-400'
  );

  return el;
}
