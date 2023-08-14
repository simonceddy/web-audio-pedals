export default class AnalogDelay {
  /** @type {GainNode} */
  #input;

  /** @type {GainNode} */
  #output;

  /** @type {GainNode} */
  #wet;

  /** @type {GainNode} */
  #dry;

  /** @type {GainNode} */
  #feedback;

  /** @type {DelayNode} */
  #delay;

  /** @type {BiquadFilterNode} */
  #filter;

  /** @type {OscillatorNode} */
  #lfo;

  /** @type {GainNode} */
  #lfoGain;

  /**
   *
   * @param {AudioContext} context
   * @param {number} time
   * @param {number} feedback
   */
  constructor(context, time, feedback = 0.3) {
    this.#input = context.createGain();
    this.#output = context.createGain();
    this.#delay = context.createDelay();
    this.#delay.delayTime.value = time;

    this.#wet = context.createGain();
    this.#dry = context.createGain();
    this.#feedback = context.createGain();
    this.#feedback.gain.value = feedback;

    this.#input.connect(this.#dry);
    this.#dry.connect(this.#output);

    this.#filter = context.createBiquadFilter();
    this.#filter.type = 'lowpass';
    this.#filter.frequency.value = 2000; // Freq. in Hz    // feedback loop
    this.#input.connect(this.#filter);
    this.#filter.connect(this.#delay);
    this.#delay.connect(this.#feedback);
    this.#feedback.connect(this.#filter); // connect to output
    this.#delay.connect(this.#wet);
    this.#wet.connect(this.#output);

    // create LFO and set values
    this.#lfo = context.createOscillator();
    this.#lfo.frequency.value = 0.5; // Freq. in Hz
    this.#lfoGain = context.createGain();
    this.#lfoGain.gain.value = 0.0005;
    this.#lfo.start(); // start the oscillator// connections
    this.#lfo.connect(this.#lfoGain);
    this.#lfoGain.connect(this.#delay.delayTime); // modulates a parameter
  }

  get feedback() {
    return this.#feedback.gain.value;
  }

  set feedback(val) {
    this.#feedback.gain.value = val;
  }

  get feedbackNode() {
    return this.#feedback;
  }

  get lfoRate() {
    return this.#lfo.frequency.value;
  }

  set lfoRate(val) {
    this.#lfo.frequency.value = val;
  }

  get lfoAmount() {
    return this.#lfoGain.gain.value;
  }

  set lfoAmount(val) {
    this.#lfoGain.gain.value = val;
  }

  get lfoNode() {
    return this.#lfo;
  }

  get lfoGainNode() {
    return this.#lfoGain;
  }

  get input() {
    return this.#input.gain.value;
  }

  set input(val) {
    this.#input.gain.value = val;
  }

  get inputNode() {
    return this.#input;
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

  get wet() {
    return this.#wet.gain.value;
  }

  set wet(val) {
    this.#wet.gain.value = val;
  }

  get wetNode() {
    return this.#wet;
  }

  get dry() {
    return this.#dry.gain.value;
  }

  set dry(val) {
    this.#dry.gain.value = val;
  }

  get dryNode() {
    return this.#dry;
  }

  get filterHz() {
    return this.#filter.frequency.value;
  }

  set filterHz(val) {
    this.#filter.frequency.value = val;
  }

  get filterRes() {
    return this.#filter.Q.value;
  }

  set filterRes(val) {
    this.#filter.Q.value = val;
  }

  get filterNode() {
    return this.#filter;
  }
}
