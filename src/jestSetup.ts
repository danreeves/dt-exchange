// Hacky way to make these not undefined

const extObject = {
  alarms: {
    create: jest.fn(),
    onAlarm: {
      addListener: jest.fn(),
    },
  },
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
  },
  browserAction: {
    onClicked: {
      addListener: jest.fn(),
    },
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
  },
} as any
window.chrome = extObject as typeof window.chrome
window.browser = extObject as typeof window.browser
