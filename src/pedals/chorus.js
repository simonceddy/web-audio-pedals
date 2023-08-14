import { $el } from '../$e';
import bypassSwitch from '../components/bypassSwitch';
import paramControl from '../components/paramControl';
import initPedalContainer from '../initPedalContainer';

const params = {
  rate: 5,
  feedback: 0.6,
  delay: 0.145,
  bypass: false
};

/**
 *
 * @param {import('tunajs')} tuna
 * @param {*} id
 */
function chorus(tuna, id = 'chorus-pedal') {
  const container = initPedalContainer(`${id}`, '160px', '200px');

  const effect = new tuna.Chorus(params);

  const label = $el('span');

  label.innerHTML = 'Chorus';
  label.classList.add(
    'font-bold',
    'font-sans',
    'italic',
    'absolute',
    'top-[56%]',
    'w-full',
    'text-center',
    'select-none',
  );

  const rateKnob = paramControl(`${id}-rate-knob`, effect, 'rate', {
    min: 0.01,
    max: 10,
    scale: 10,
    value: typeof effect.rate === 'number' ? effect.rate : params.rate,
    label: 'rate'
  });

  const delayKnob = paramControl(`${id}-delay-knob`, effect, 'delay', {
    min: 0,
    max: 1,
    scale: 1,
    value: typeof effect.delay === 'number' ? effect.delay : params.delay,
    label: 'delay'
  });

  const feedbackKnob = paramControl(`${id}-feedback-knob`, effect, 'feedback', {
    min: 0,
    max: 1,
    scale: 1,
    value: typeof effect.feedback === 'number' ? effect.feedback : params.feedback,
    label: 'feedback'
  });

  const depthKnob = paramControl(`${id}-depth-knob`, effect, 'depth', {
    min: 0,
    max: 1,
    scale: 1,
    value: typeof effect.depth === 'number' ? effect.depth : params.depth,
    label: 'depth'
  });

  const controls = $el('div');
  controls.classList.add(
    'row',
    'flex-wrap',
    'justify-evenly',
    'items-center',
    'w-full',
    'p-2'
  );

  controls.append(
    rateKnob,
    delayKnob,
    feedbackKnob,
    depthKnob
  );

  const footswitches = $el('div');
  footswitches.classList.add('row', 'justify-between', 'items-center');
  const bypass = bypassSwitch(id, effect);
  footswitches.append(bypass);

  container.classList.add(
    'bg-cyan-400',
    'text-black',
    'col',
    'justify-between',
    'items-center'
  );

  container.append(controls, footswitches, label);
  return [container, effect];
}

export default chorus;
