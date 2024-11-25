import pino from 'pino';
import tap from 'tap';

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

tap.beforeEach(() => {
  logger.level = 'silent';
});

tap.afterEach(() => {
  logger.level = 'info';
});

export default logger;