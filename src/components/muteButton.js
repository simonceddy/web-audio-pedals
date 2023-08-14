import { $el } from '../$e';

/**
 *
 * @param {AudioContext} context
 */
export default function muteButton(context) {
  /** @type {HTMLButtonElement} */
  const btn = $el('button');
  let muted = false;
  btn.addEventListener('click', () => {
    if (muted) {
      context.resume();
      btn.classList.replace('bg-red-200', 'bg-slate-200');
      btn.classList.replace('dark:bg-red-800', 'dark:bg-slate-800');
    } else {
      context.suspend();
      btn.classList.replace('bg-slate-200', 'bg-red-200');
      btn.classList.replace('dark:bg-slate-800', 'dark:bg-red-800');
    }
    muted = !muted;
  });

  btn.classList.add(
    'text-xl',
    'bg-slate-200',
    'text-black',
    'dark:bg-slate-800',
    'dark:text-white',
    'hover:underline',
    'border-2',
    'rounded',
    'border-black',
    'dark:border-white',
    'active:border-red-300',
    'dark:active:border-red-700',
    'col',
    'justify-center',
    'items-center',
    'h-2/3',
    'w-[10%]'
  );

  btn.innerHTML = 'PANIC!';

  return btn;
}
