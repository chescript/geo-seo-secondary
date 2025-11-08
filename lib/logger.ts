import pino from 'pino';

// Define the configuration for the logger
const loggerConfig: pino.LoggerOptions = {
  // Set the minimum log level based on the environment
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
};

// In development, use 'pino-pretty' for nicely formatted, human-readable logs
if (process.env.NODE_ENV !== 'production') {
  loggerConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true, // Add color to the output
      translateTime: 'SYS:standard', // Use a standard timestamp format
      ignore: 'pid,hostname', // Don't show process ID and hostname
    },
  };
}

/**
 * A pre-configured logger instance.
 *
 * In Development:
 * - Logs at the 'debug' level and above.
 * - Output is colorized and human-readable.
 *
 * In Production:
 * - Logs at the 'info' level and above (i.e., 'debug' logs are suppressed).
 * - Output is standard JSON for efficient processing by logging services.
 */
const logger = pino(loggerConfig);

export default logger;
