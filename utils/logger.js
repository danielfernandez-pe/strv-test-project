import pino from 'pino';

const logger = pino({
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
        bindings: (bindings) => {
            return {};
          }
    },
    timestamp: pino.stdTimeFunctions.isoTime
});

export default logger;