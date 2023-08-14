import { $el } from '../$e';
import footswitch from './footswitch';
import led from './led';

export default function ledSwitch(id, toggled = false) {
  const elLed = led(`${id}-led`);
  elLed.classList.add(toggled ? 'bg-red-400' : 'bg-gray-500', 'mb-1');

  const elFootswitch = footswitch(`${id}-footswitch`);

  const toggle = () => {
    elLed.classList.toggle('bg-gray-500');
    elLed.classList.toggle('bg-red-400');
  };

  const elContainer = $el('div');
  elContainer.classList.add('col', 'justify-between', 'items-center', 'mb-2');
  elContainer.append(elLed, elFootswitch);
  return [elContainer, toggle, elFootswitch];
}
