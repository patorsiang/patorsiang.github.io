type LogLevel = "info" | "warn" | "error";

const IS_DEV = process.env.NODE_ENV === "development";

function formatMessage(level: LogLevel, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

/**
 * A simple environment-aware logger.
 * In development, it prefixes logs with a timestamp and level.
 * In production, it currently uses standard console methods (can be extended to a real provider later).
 */
export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (IS_DEV) {
      console.info(formatMessage("info", message), ...args);
    } else {
      console.info(message, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (IS_DEV) {
      console.warn(formatMessage("warn", message), ...args);
    } else {
      console.warn(message, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    // We always want full error context, even in production
    if (IS_DEV) {
      console.error(formatMessage("error", message), ...args);
    } else {
      console.error(message, ...args);
    }
  },
};
