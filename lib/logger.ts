/**
 * Structured logging utility for Vercel
 * Outputs JSON logs that are properly parsed by Vercel's logging system
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogData {
  level: LogLevel;
  service: string;
  action: string;
  [key: string]: unknown;
}

/**
 * Log structured data to console
 * Vercel automatically parses JSON console logs for better observability
 */
function log(data: LogData): void {
  const logFn = data.level === "error" ? console.error : console.log;
  logFn(JSON.stringify(data));
}

export const logger = {
  info: (service: string, action: string, data?: Record<string, unknown>) => {
    log({ level: "info", service, action, ...data });
  },

  error: (service: string, action: string, error: unknown, data?: Record<string, unknown>) => {
    const errorData = {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };
    log({ level: "error", service, action, ...errorData, ...data });
  },

  warn: (service: string, action: string, data?: Record<string, unknown>) => {
    log({ level: "warn", service, action, ...data });
  },

  debug: (service: string, action: string, data?: Record<string, unknown>) => {
    log({ level: "debug", service, action, ...data });
  },
};
