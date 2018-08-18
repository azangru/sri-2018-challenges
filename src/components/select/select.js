import h from 'hyperscript';

import './select.css';

const renderSelect = (options) => {
  return h('.select',
    fillSelect(options)
  );
};

const fillSelect = (options) => {
  const activeOption = getActiveOption(options);

  return h('.select__wrapper',
    h('.select__button',
      activeOption.value
    ),
    h('select',
      { onchange: (event) => updateSelect(event, options) },
      renderOptions(options),
    )
  );
};

const renderOptions = (options) => {
  return options
    .map((option) => h('option', { value: option.value, selected: option.isActive  }, option.value));
};

const updateSelect = (event, options) => {
  const select = event.currentTarget;
  const value = select.value;
  const selectComponent = select.parentNode.parentNode; // stupid, but we don't have Element.closest() in all browsers
  const selectWrapper = select.parentNode;
  const selectedOption = options.find(option => option.value === value);
  selectedOption.onClick();
  const updatedOptions = options.map(option => {
    if (option.value === value) {
      return Object.assign({}, option, { isActive: true });
    } else {
      return Object.assign({}, option, { isActive: false });
    }
  });
  const newSelect = fillSelect(updatedOptions);

  selectComponent.replaceChild(newSelect, selectWrapper);
};

const getActiveOption = options => options.find(option => option.isActive);

export default renderSelect;
