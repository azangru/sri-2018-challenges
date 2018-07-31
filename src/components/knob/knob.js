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

  const angle = Math.atan2(-y, x) * radToDeg;

  console.log('event', angle);
};

export default renderKnob;
