import algoDrive from './algoDrive';
// import bigMute from './bigMute';
import chorus from './chorus';
import compressor from './compressor';
import delay from './delay';
import yumCrisps from './yumCrisps';

export { default as algoDrive } from './algoDrive';
export { default as bigMute } from './bigMute';
export { default as chorus } from './chorus';
export { default as compressor } from './compressor';
export { default as delay } from './delay';
export { default as yumCrisps } from './yumCrisps';

const pedals = [
  {
    key: 'algoDrive',
    factory: algoDrive,
    name: 'AlgoDrive'
  },
  // {
  //   key: 'bigMute',
  //   factory: bigMute,
  //   name: 'BigMute'
  // },
  {
    key: 'chorus',
    factory: chorus,
    name: 'chorus'
  },
  {
    key: 'compressor',
    factory: compressor,
    name: 'Compressor'
  },
  {
    key: 'delay',
    factory: delay,
    name: 'Delay'
  },
  {
    key: 'yumCrisps',
    factory: yumCrisps,
    name: 'Yum Crisps'
  },
];

export default pedals;
