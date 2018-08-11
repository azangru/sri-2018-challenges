export const mainAreaDevices = [
  {
    name: 'Philips Cooler',
    message: 'Начнет охлаждать в 16:30',
    icon: 'thermometer',
    isOn: false,
    widgetType: 'temparature-knob'
  },
  {
    name: 'Xiaomi Yeelight LED Smart Bulb',
    message: 'Включится в 17:00',
    icon: 'sun',
    isOn: false,
    widgetType: 'light-slider'
  },
  {
    name: 'Elgato Eve Degree Connected',
    message: 'Выключено до 17:00',
    icon: 'thermometer',
    isOn: false,
    widgetType: 'temperature-slider'
  },
];

export const selectedDevices = [
  {
    name: 'Xiaomi Yeelight LED Smart Bulb',
    message: 'Включено',
    icon: 'sun',
    isOn: true,
    type: 'bulb',
    location: 'kitchen'
  },
  {
    name: 'D-Link Omna 180 Cam',
    message: 'Включится в 17:00',
    icon: 'sun',
    isOn: false,
    type: 'camera',
    location: 'hall'
  },
  {
    name: 'Elgato Eve Degree Connected',
    message: 'Выключено до 17:00',
    icon: 'thermometer',
    isOn: false,
    type: 'climate',
    location: 'hall'
  },
  {
    name: 'LIFX Mini Day & Dusk A60 E27',
    message: 'Включится в 17:00',
    icon: 'sun',
    isOn: false,
    type: 'bulb',
    location: 'hall'
  },
  {
    name: 'Xiaomi Mi Air Purifier 2S',
    message: 'Включено',
    icon: 'sun',
    isOn: true,
    type: 'climate',
    location: 'hall'
  },
  {
    name: 'Philips Zhirui',
    message: 'Выключено',
    icon: 'sun',
    isOn: false,
    type: 'bulb',
    location: 'kitchen'
  },
  {
    name: 'Xiaomi Mi Air Purifier 2S',
    message: 'Включено',
    icon: 'sun',
    isOn: true,
    type: 'climate',
    location: 'kitchen'
  }
];

export const selectedScenarios = [
  {
    name: 'Выключить весь свет в доме и во дворе',
    icon: 'sun-on'
  },
  {
    name: 'Я ухожу',
    icon: 'clock'
  },
  {
    name: 'Включить свет в коридоре',
    icon: 'sun-on'
  },
  {
    name: 'Набрать горячую ванну',
    message: 'Начнётся в 18:00',
    icon: 'thermometer-on'
  },
  {
    name: 'Сделать пол тёплым во всей квартире',
    icon: 'thermometer-on'
  }
];
