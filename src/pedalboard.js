export default class Pedalboard {
  /** @type {(AudioNode|import('tunajs').TunaAudioNode)[]} */
  #signalPath = [];

  /** @type {GainNode} */
  #input;

  /** @type {GainNode} */
  #output;

  #outputConnectedTo;

  /** @type {AudioNode} */
  #inputConnectedTo;

  /**
   *
   * @param {AudioContext} context
   */
  constructor(context, effects = []) {
    this.#input = context.createGain();
    this.#output = context.createGain();

    if (effects.length > 0) this.push(...effects.filter((v) => v && v.connect !== undefined));
  }

  #connectSignals() {
    let last = this.#input;

    this.#signalPath.forEach((effect) => {
      if (last && last.connect) last.connect(effect);
      if (effect.connect) last = effect;
    });

    last.connect(this.#output);
    // console.log(this.#output);
    if (this.#outputConnectedTo) this.#output.connect(this.#outputConnectedTo);
    if (this.#inputConnectedTo) this.#inputConnectedTo.connect(this.#input);
  }

  #disconnectAll() {
    this.#signalPath.forEach((effect) => {
      effect.disconnect();
    });
    // console.log(this.#output);
  }

  get effects() {
    return this.#signalPath;
  }

  clear() {
    this.#disconnectAll();
    this.#signalPath = [];
  }

  push(...effect) {
    this.#signalPath.push(...effect);
  }

  unshift(...effect) {
    this.#signalPath.unshift(...effect);
  }

  shift() {
    return this.#signalPath.shift();
  }

  pop() {
    return this.#signalPath.pop();
  }

  plugIn(inputNode) {
    this.#inputConnectedTo = inputNode;
    this.#inputConnectedTo.connect(this.#input);
  }

  connect(desitinationNode) {
    this.#disconnectAll();
    this.#connectSignals();
    this.lastEffect.connect(desitinationNode);
    this.#outputConnectedTo = desitinationNode;
  }

  get connectedTo() {
    return this.#outputConnectedTo || null;
  }

  disconnect() {
    this.#disconnectAll();
  }

  indexOf(effect) {
    return this.#signalPath.lastIndexOf(effect);
  }

  insert(effect, index = -1) {
    this.#disconnectAll();
    if (index === 0) this.unshift(effect);
    else if (index < 0 || index >= this.#signalPath.length) this.push(effect);
    else {
      this.#signalPath.splice(index, 0, effect);
    }
    this.#connectSignals();
  }

  remove(index) {
    console.log(index, this.#signalPath);
    this.#disconnectAll();
    if (index === 0) this.shift();
    else if (index < 0 || index >= this.#signalPath.length) this.pop();
    else {
      const firstEffects = this.#signalPath.slice(0, index);
      const secondEffects = this.#signalPath.slice(index + 1);
      this.#signalPath = firstEffects.concat(secondEffects);
    }
    this.#connectSignals();
    console.log(this.#signalPath);
  }

  atIndex(index) {
    return this.#signalPath[index] || null;
  }

  get inputNode() {
    return this.#input;
  }

  get input() {
    return this.#input.gain.value;
  }

  set input(val) {
    this.#input.gain.value = val;
  }

  get output() {
    return this.#output.gain.value;
  }

  set output(val) {
    this.#output.gain.value = val;
  }

  get outputNode() {
    return this.#output;
  }

  get lastEffect() {
    return this.#signalPath[this.#signalPath.length - 1] || null;
  }

  get firstEffect() {
    return this.#signalPath[0] || null;
  }
}
