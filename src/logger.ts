import { Logger } from "ts-log-debug";

export const logger = new Logger("logger");

logger.appenders
    .set("debug", {
        type: "console",
        layout: { 
            type: "basic" 
        }, 
        level: ["debug", "info", "trace"]
    });
logger.appenders 
    .set("log", {
        type: "file",
        filename: "live-logs.log",
        maxLogSize: 10485760, // 10Mb
        backups: 3,
        compress: true,
        layout: {
            type: "basic"
        },
        level: ["error", "fatal", "warn"]
    });