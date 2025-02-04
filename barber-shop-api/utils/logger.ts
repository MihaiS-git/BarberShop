import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs-extra';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = path.join(__dirname,'../..', 'logs');

// Ensure the logs directory exists
fs.ensureDirSync(logDirectory);
console.log(`Log directory created at: ${logDirectory}`);

const logger = createLogger({
    level: 'info', // error, warn, info, http, verbose, debug, silly
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: 'error', // Set the console transport to log only errors
            format: format.combine(
                format.colorize(),
                format.printf(({ level, message, timestamp, stack }) => {
                    return `${timestamp} ${level}: ${message}\n${stack}`;
                })
            )
        }),
        new DailyRotateFile({
            filename: path.join(logDirectory, 'error-%DATE%.log'), // ✅ Fix: Set filename for daily logs
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m', // Optional: Set max log file size
            maxFiles: '14d', // Optional: Keep logs for 14 days
            level: 'error',
            format: format.combine(
                format.timestamp(),
                format.printf(({ level, message, timestamp, stack, email, ip }) => {
                    return `${timestamp} ${level}: ${message} - Email: ${email} - IP: ${ip}\n${stack || ''}`;
                })
            ),
            zippedArchive: true 
        })
    ]
});

console.log('Winston logger configured');
/* 
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an informational message');
logger.http('This is an HTTP log message');
logger.verbose('This is a verbose message');
logger.debug('This is a debug message');
logger.silly('This is a silly message'); */

export default logger;
