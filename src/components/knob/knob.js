// references:
// http://jsfiddle.net/MLSnK/11/
// https://tutorialzine.com/2011/11/pretty-switches-css3-jquery

import h from 'hyperscript';

import arrowheadPath from 'assets/icons/knob-arrowhead.svg';

import './knob.css';

const renderKnob = (widgetData) => {
  return h('div.knob',
    h('div.knob__body', { onmousemove: rotateKnob, ontouchmove: rotateKnob },
      h('div.knob__arrowhead',
        h('img', { src: arrowheadPath })
      )
    )
  );
};

const findKnobCenter = () => {
  const knob = document.querySelector('.knob__body');
  return {
    x: knob.offsetLeft + knob.offsetWidth / 2,
    y: knob.offsetTop + knob.offsetHeight / 2
  };
};

const rotateKnob = (event) => {
  const { pageX: eventX, pageY: eventY } = event;
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
  let startAngle = 0;

  tmp = Math.floor(angle - startAngle);

  // Making sure the current rotation
  // stays between 0 and 359
  if (tmp < 0) {
    tmp = 360 + tmp;
  } else if (tmp > 359) {
    tmp = tmp % 360;
  }
  console.log('event', angle);
  document.querySelector('.knob__body').style.transform = `rotate(${tmp}deg)`;
};

export default renderKnob;
