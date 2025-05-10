import pino from 'pino';

const logDir = './logs';

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: { destination: `${logDir}/app.log` },
    },
  ],
});

const logger = pino(
  {
    level: 'info',
    formatters: {
      level: (label) => ({ level: label }),
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
  transport
);

export default logger;