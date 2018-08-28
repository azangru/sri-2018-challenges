// The code of this component is heavily influenced by the code of an old jQuery-based example
// found here: https://tutorialzine.com/2011/11/pretty-switches-css3-jquery

import h from 'hyperscript';

import arrowheadPath from 'assets/icons/knob-arrowhead.svg';
import dialColoredPath from 'assets/icons/knob-dial.svg';

import './knob.css';

const MAX_COUNTERCLOCKWISE = 210;
const MAX_CLOCKWISE = 150;
const ROTATION_RANGE = 300;

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
      ontouchstart: grabKnob,
      onmousemove: rotateKnob,
      ontouchmove: rotateKnob,
      style: {
        transform: `rotate(${state.currentKnobRotation}deg)`
      }
    },
      h('div.knob__arrowhead',
        h('img', { src: arrowheadPath })
      ),
    ),
    h('div.knob__temperature', '+23')
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

  const { eventX, eventY } = getEventCoordinates(event);
  const { x: knobX, y: knobY } = findKnobCenter();
  const radToDeg = 180/Math.PI;

  const x = eventX - knobX;
  const y = eventY - knobY;

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

  tmp = Math.floor(state.currentKnobRotation - (angle - state.startRotation));

  // Making sure the current rotation
  // stays between 0 and 359
  if (tmp < 0) {
    tmp = 360 + tmp;
  } else if (tmp > 359) {
    tmp = tmp % 360;
  }

  // A half-assed attempt to stop the knob from turning beyond a certain angle
  if (tmp < MAX_COUNTERCLOCKWISE && tmp > MAX_CLOCKWISE) return;

  state.temporaryRotation = tmp; //(state.currentKnobRotation -  tmp) % 360;

  document.querySelector('.knob__body').style.transform = `rotate(${state.temporaryRotation}deg)`;
  updateTemperature(angleToTemperature(state.temporaryRotation));
};

function getEventCoordinates(event) {
  if (event.type === 'touchmove') {
    return {
      eventX: event.touches[0].pageX,
      eventY: event.touches[0].pageY,
    };
  } else {
    return {
      eventX: event.pageX,
      eventY: event.pageY
    };
  }
}

function angleToTemperature(angle) {
  // start counting from the MAX_COUNTERCLOCKWISE angle representing the minimum temperature
  let adjustedAngle = angle - MAX_COUNTERCLOCKWISE;
  if (adjustedAngle < 0) {
    adjustedAngle = 360 + adjustedAngle;
  }

  const minTemperature = 10;
  const maxTemperature = 30;
  const temperatureRange = maxTemperature - minTemperature;

  const angleToPercent = Math.floor(adjustedAngle / ROTATION_RANGE * 100);

  return (Math.floor(angleToPercent * temperatureRange / 100)) + minTemperature;
}

function updateTemperature(temperature) {
  const temperatureContainer = document.querySelector('.knob__temperature');
  temperatureContainer.innerHTML = `+${temperature}`;
}

export default renderKnob;
