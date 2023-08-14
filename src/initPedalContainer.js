import { $el } from './$e';

export default function initPedalContainer(id, width = '140px', height = '200px') {
  const el = $el('div');
  el.classList.add(
    'pedal-container',
    'border',
    'dark:border-slate-300',
    'border-slate-700',
    'absolute',
    'z-10',
    'w-fit',
    'h-fit',
  );

  const header = $el('div');

  header.classList.add('row', 'w-full', 'h-4', 'z-20', 'bg-slate-500', 'cursor-pointer', 'justify-end', 'items-start');

  const closeButton = $el('button');
  closeButton.id = `${id}-close-button`;
  closeButton.type = 'button';
  closeButton.innerHTML = 'x';
  closeButton.classList.add('uppercase', 'hover:underline', 'border', 'border-slate-500', 'active:border-green-400', 'col', 'justify-center', 'items-center', 'text-sm', 'h-4', 'w-4', 'font-mono');
  closeButton.ondragstart = () => false;
  closeButton.addEventListener('click', () => {
    console.log('remove pedal');
  });

  header.appendChild(closeButton);

  const pedalInner = $el('div');
  pedalInner.classList.add('absolute', 'top-2', 'z-10');
  pedalInner.style.width = width || '140px';
  pedalInner.style.height = height || '200px';
  el.style.minHeight = height || '200px';
  el.style.width = width || '140px';
  el.id = id;
  el.append(pedalInner, header);

  header.onmousedown = (e) => {
    el.style.position = 'absolute';
    // el.style.zIndex = 10;
    const shiftX = e.clientX - el.getBoundingClientRect().left + 2;
    const shiftY = e.clientY - el.getBoundingClientRect().top + 2;
    function moveAt(pageX, pageY) {
      el.style.left = `${(pageX - shiftX)}px`;
      el.style.top = `${(pageY - shiftY)}px`;
    }
    // console.log('beginneth');
    moveAt(e.pageX, e.pageY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    const mouseupHandler = () => {
      document.removeEventListener('mousemove', onMouseMove);
      header.onmouseup = null;
    };
    // (2) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', mouseupHandler);
    // (3) drop the ball, remove unneeded handlers
    header.onmouseup = mouseupHandler;
  };

  header.ondragstart = () => false;
  return el;
}
