function makeDistortionCurve(amount, sampleRate) {
  const k = amount;
  const nSamples = typeof sampleRate === 'number' ? sampleRate : 44100;
  const curve = new Float32Array(nSamples);
  // const deg = Math.PI / 180;
  let i = 0;
  let x;
  for (; i < nSamples; i += 1) {
    // TODO verify brackets in right spot
    x = (i * 2) / nSamples - 1;
    curve[i] = (3 + k) * (Math.atan(Math.sinh(x * 0.25) * 5) / (Math.PI + k * Math.abs(x)));
  }
  return curve;
}

// oscillatorNode.connect(oscillatorGainNode);
// oscillatorGainNode.connect(distortionGainNode);
// distortionGainNode.connect(distortionNode);
// distortionNode.connect(finish);

// oscillatorNode.start(0);

export default class CurvyCruncha {
  /** @type {GainNode} */
  #input;

  /** @type {GainNode} */
  #output;

  /** @type {GainNode} */
  #gainNode;

  /** @type {WaveShaperNode} */
  #waveshaper;

  /** @type {BiquadFilterNode} */
  #lowPass;

  /** @type {BiquadFilterNode} */
  #highPass;

  name = 'Curvy Cruncha';

  /**
   * @param {AudioContext} context
   */
  constructor(context) {
    this.#gainNode = context.createGain();
    this.#input = context.createGain();
    this.#output = context.createGain();
    this.#waveshaper = context.createWaveShaper();
    this.#lowPass = context.createBiquadFilter();
    this.#highPass = context.createBiquadFilter();

    const { sampleRate } = context;
    this.#waveshaper.curve = makeDistortionCurve(400, sampleRate);

    this.#input.connect(this.#gainNode);
    this.#gainNode.connect(this.#waveshaper);
    this.#waveshaper.connect(this.#lowPass);
    this.#lowPass.connect(this.#highPass);
    this.#highPass.connect(this.#output);
  }

  connect(destinationNode, input = null, ouput = null) {
    return this.#output.connect(destinationNode, input, ouput);
  }

  disconnect() {
    this.#output.disconnect();
  }

  get input() {
    return this.#input;
  }

  get output() {
    return this.#output;
  }

  get gain() {
    return this.#gainNode.gain.value;
  }

  set gain(val) {
    this.#gainNode.gain.value = val;
  }

  get gainNode() {
    return this.#gainNode;
  }

  get curve() {
    return this.#waveshaper.curve;
  }

  get waveshaperNode() {
    return this.#waveshaper;
  }

  get lowPassNode() {
    return this.#lowPass;
  }

  get lowPassHz() {
    return this.#lowPass.frequency.value;
  }

  set lowPassHz(val) {
    this.#lowPass.frequency.value = val;
  }

  get highPassHz() {
    return this.#highPass.frequency.value;
  }

  set highPassHz(val) {
    this.#highPass.frequency.value = val;
  }

  get highPassNode() {
    return this.#highPass;
  }
}
