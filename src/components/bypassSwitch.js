import ledSwitch from './ledSwitch';

export default function bypassSwitch(id, effect) {
  const [bypass, toggle] = ledSwitch(`${id}-bypass`, !effect.bypass);
  bypass.onclick = () => {
    console.log(effect);
    toggle();
    effect.bypass = !effect.bypass;
  };

  return bypass;
}
