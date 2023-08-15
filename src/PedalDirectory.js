import pedalDirectory from './pedals';

export default class PedalDirectory {
  /** @type {import('tunajs')} */
  #tuna;

  /** @type {AudioContext} */
  #context;

  constructor(context, tuna) {
    this.#tuna = tuna;

    this.#context = context;
  }

  factoryFor(key) {
    let result = pedalDirectory.tunaPedals.pedals.find((v) => v.key === key);
    if (result) {
      return (id) => result.factory(this.#tuna, id);
    }
    result = pedalDirectory.webAudioPedals.pedals.find((v) => v.key === key);
    if (result) {
      return (id) => result.factory(this.#context, id);
    }
    return false;
  }
}
