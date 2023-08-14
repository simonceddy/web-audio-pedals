import pedalboard from './templates/pedalboard.ejs';

export default function initDom() {
  document.body.innerHTML = pedalboard;
}
