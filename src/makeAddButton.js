/* eslint-disable no-unused-vars */
import { $el } from './$e';
import toolButton from './components/toolbar/toolButton';
import pedals from './pedals';

console.log(pedals);

/**
 * @param {HTMLDivElement} el
 */
export default function makeAddButton(addPedal = () => {}) {
  const addBtn = toolButton('toolbar-button-add');
  const addChoices = $el('span');
  addChoices.classList.add('col', 'justify-start', 'items-start', 'hidden', 'absolute', 'bottom-full', 'bg-cyan-200', 'dark:bg-cyan-900', 'left-0');
  pedals.forEach(({ key, name, factory }) => {
    const btn = toolButton(`toolbar-button-${key}`);
    btn.classList.add('w-full');
    btn.innerHTML = name;
    btn.onclick = () => {
      addPedal(factory, key);
    };
    addChoices.appendChild(btn);
  });

  addBtn.classList.add('relative', 'm-1', 'text-lg', 'font-bold', 'font-mono', 'w-8', 'h-8', 'col', 'justify-center', 'items-center');
  addBtn.innerHTML = '+';
  addBtn.append(addChoices);
  addBtn.onclick = () => {
    addChoices.classList.toggle('hidden');
    addBtn.classList.toggle('bg-sky-300');
  };

  return addBtn;
}
