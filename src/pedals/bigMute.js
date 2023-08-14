import { $el } from '../$e';
import ledSwitch from '../components/ledSwitch';
import initPedalContainer from '../initPedalContainer';

/**
 *
 * @param {AudioContext} context
 * @param {*} id
 */
function bigMute(context, id = 'bit-mute') {
  const container = initPedalContainer(`${id}`, '160px', '200px');

  const label = $el('span');
  label.innerHTML = 'big MUTE';

  label.classList.add('absolute', 'top-1/2', 'left-2', 'text-4xl', 'font-bold', 'font-serif', '-rotate-12', 'select-none');

  let muted = false;
  const footswitches = $el('div');
  footswitches.classList.add('row', 'justify-between', 'items-center');
  const [muteSwitch, toggle, muteButton] = ledSwitch(`${id}-mute`, muted);
  muteSwitch.classList.add('absolute', 'top-[40%]', 'w-full', 'col', 'justify-center', 'items-center', 'h-fit');
  muteButton.addEventListener('click', () => {
    if (!muted) context.suspend();
    else context.resume();
    muted = !muted;
    toggle();
  });

  footswitches.append(muteSwitch);

  container.classList.add(
    'bg-red-700',
    'text-white',
    'italic',
    'overflow-hidden'
  );

  container.append(label, footswitches);
  return [container];
}

export default bigMute;
