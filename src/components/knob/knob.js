// The code of this component is heavily influenced by the code of an old jQuery-based example
// found here: https://tutorialzine.com/2011/11/pretty-switches-css3-jquery

import h from 'hyperscript';

import arrowheadPath from 'assets/icons/knob-arrowhead.svg';
import dialColoredPath from 'assets/icons/knob-dial.svg';

import './knob.css';

let initialState = {
  isKnobGrabbed: false,
  startRotation: null,
  temporaryRotation: null
};

let state = Object.assign({}, initialState);
state.currentKnobRotation = 90;

const renderKnob = (widgetData) => {
  return h('div.knob',
    renderKnobDial(),
    h('div.knob__body', {
      onmousedown: grabKnob,
      onmousemove: rotateKnob,
      ontouchmove: rotateKnob,
      style: {
        transform: `rotate(${state.currentKnobRotation}deg)`
      }
    },
      h('div.knob__arrowhead',
        h('img', { src: arrowheadPath })
      )
    )
  );
};

const renderKnobDial = () => {
  return h('div.knob__dial-wrapper',
    h('div.knob__dial',
      h('img', { src: dialColoredPath }),
    ),
    h('div.knob__dial_grey',
      h('img', { src: dialColoredPath }),
    ),
  );
};

const grabKnob = () => {
  state.isKnobGrabbed = true;
  document.addEventListener('mouseup', releaseKnob);
  document.addEventListener('touchend', releaseKnob);
};

const releaseKnob = () => {
  state = Object.assign(
    {},
    initialState,
    {
      currentKnobRotation: state.temporaryRotation
    }
  );
  document.removeEventListener('mouseup', releaseKnob);
  document.removeEventListener('touchend', releaseKnob);
};

const findKnobCenter = () => {
  const knob = document.querySelector('.knob__body');
  const { x, y, width } = knob.getBoundingClientRect();
  const radius = width / 2;
  const centerX = Math.floor(x + radius);
  const centerY = Math.floor(y + radius);
  return {
    x: centerX,
    y: centerY
  };
};

const rotateKnob = (event) => {
  if (!state.isKnobGrabbed) return;

  const { pageX: eventX, pageY: eventY } = event;
  const { x: knobX, y: knobY } = findKnobCenter();
  const radToDeg = 180/Math.PI;

  const x = eventX - knobX;
  const y = eventY - knobY;

  console.log(findKnobCenter());

  // y-axis on the screen is inverted compared to what we are used to on paper
  let angle = Math.atan2(-y, x) * radToDeg;

  // make sure the angle is positive
  if (angle < 0) {
    angle = 360 + angle;
  }

  let tmp;
  if (state.startRotation === null) {
    state.startRotation = angle;
  }

  tmp = Math.floor(angle - state.startRotation);

  // Making sure the current rotation
  // stays between 0 and 359
  if (tmp < 0) {
    tmp = 360 + tmp;
  } else if (tmp > 359) {
    tmp = tmp % 360;
  }
  state.temporaryRotation = state.currentKnobRotation -  tmp;

  document.querySelector('.knob__body').style.transform = `rotate(${state.temporaryRotation}deg)`;
};

export default renderKnob;
