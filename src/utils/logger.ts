import pino from 'pino';

const logger = pino({
    formatters: {
        level: (label: string) => {
            return { level: label.toUpperCase() };
        },
        bindings: (bindings: Record<string, any>) => {
            return {};
          }
    },
    timestamp: pino.stdTimeFunctions.isoTime
});

export default logger;