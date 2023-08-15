/* eslint-disable no-unused-vars */
import { $el } from './$e';
import toolButton from './components/toolbar/toolButton';
import makePedalDirectory from './makePedalDirectory';
import pedals from './pedals';

console.log(pedals);

/**
 * @param {HTMLDivElement} el
 */
export default function makeAddButton(addPedal = () => {}) {
  const addBtn = toolButton('toolbar-button-add');
  const pedalDirectoryMenu = makePedalDirectory(addPedal);

  addBtn.classList.add('relative', 'm-1', 'text-lg', 'font-bold', 'font-mono', 'w-8', 'h-8', 'col', 'justify-center', 'items-center');
  addBtn.innerHTML = '+';
  addBtn.append(pedalDirectoryMenu);
  addBtn.onclick = () => {
    pedalDirectoryMenu.classList.toggle('hidden');
    addBtn.classList.toggle('bg-sky-300');
  };

  return addBtn;
}
