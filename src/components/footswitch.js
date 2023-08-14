import { $el } from '../$e';

export default function footswitch(id) {
  /** @type {HTMLButtonElement} */
  const el = $el('button');
  el.id = id;
  el.type = 'button';
  el.classList.add(
    'rounded-full',
    'h-8',
    'w-8',
    'bg-slate-400',
    'col',
    'justify-center',
    'items-center',
    'z-20',
    'active:bg-gray-500'
  );
  const innerRing = $el('span');
  innerRing.classList.add(
    'rounded-full',
    'w-6',
    'h-6',
    'border',
    'border-black'
  );

  el.appendChild(innerRing);
  return el;
}
