import { $el } from './$e';
import toolButton from './components/toolbar/toolButton';
import pedalDirectory from './pedals';

const makeMenu = () => {
  const menu = $el('div');
  menu.classList.add('col', 'justify-start', 'items-start', 'hidden', 'absolute', 'bg-cyan-200', 'dark:bg-cyan-900', 'z-50');
  return menu;
};

export default function makePedalDirectory(addPedal) {
  const categories = Object.keys(pedalDirectory);

  const menu = makeMenu();
  menu.classList.add('left-0', 'bottom-full');

  categories.forEach((key) => {
    const cBtn = toolButton(`category-${key}-button`);
    cBtn.classList.add('w-full');

    const { pedals, name: cName } = pedalDirectory[key];
    const pMenu = makeMenu();
    pMenu.classList.add('left-full', 'bottom-1/2',);
    pedals.forEach(({ key: pKey, name }) => {
      const btn = toolButton(`category-${key}-button-${pKey}`);
      btn.classList.add('w-full');
      btn.innerHTML = name;
      btn.onclick = () => {
        addPedal(pKey);
      };
      pMenu.appendChild(btn);
    });
    cBtn.innerHTML = cName;
    cBtn.append(pMenu);
    cBtn.onmouseenter = () => {
      pMenu.classList.toggle('hidden');
    };

    menu.appendChild(cBtn);
  });

  return menu;
}
