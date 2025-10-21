/**
 * Debug Logger Utility
 *
 * Usage:
 *   import { debugLog } from '@/lib/debug-logger'
 *   debugLog.auth('Login attempt', { email })
 */

const colors = {
  auth: '🔐',
  api: '⚡',
  db: '💾',
  error: '❌',
  success: '✅',
  info: 'ℹ️',
  warning: '⚠️'
};

type LogLevel = keyof typeof colors;

function formatMessage(level: LogLevel, context: string, message: string, data?: any) {
  const emoji = colors[level];
  const timestamp = new Date().toISOString();
  const prefix = `${emoji} [${context.toUpperCase()}]`;

  console.log(`${prefix} ${message}`);

  if (data !== undefined) {
    console.log(`${prefix} Data:`, data);
  }

  return { timestamp, level, context, message, data };
}

export const debugLog = {
  auth: (message: string, data?: any) => formatMessage('auth', 'AUTH', message, data),
  api: (message: string, data?: any) => formatMessage('api', 'API', message, data),
  db: (message: string, data?: any) => formatMessage('db', 'DB', message, data),
  error: (message: string, data?: any) => formatMessage('error', 'ERROR', message, data),
  success: (message: string, data?: any) => formatMessage('success', 'SUCCESS', message, data),
  info: (message: string, data?: any) => formatMessage('info', 'INFO', message, data),
  warning: (message: string, data?: any) => formatMessage('warning', 'WARNING', message, data),
};

export default debugLog;
