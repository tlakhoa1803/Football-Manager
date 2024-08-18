import {CLICKY_ERROR_PREFIX} from "../util/constants";

export const logLevels = {
    DISABLE: 0,
    ERROR: 1,
    INFO: 2,
    DEBUG: 3
}

export class Logger {
    #logLevel

    constructor(logLevel) {
        this.#logLevel = logLevel == null ? logLevel : logLevels.INFO
    }

    get logLevel () {
        return this.#logLevel
    }

    set logLevel(logLevel) {
        this.#logLevel = logLevel
    }

    #log(level, message) {
        if (window.console) {
            try {
                const ts = new Date().getTime()
                console[level](`DataSenses [${ts}]: ${message}`)
            } catch (e) {}
        }
    }

    debug (message) {
        if (this.#logLevel >= logLevels.DEBUG) {
            this.#log('debug', message)
        }
    }

    error (message) {
        if (this.#logLevel >= logLevels.ERROR) {
            this.#log('error', message)
        }
    }

    info (message) {
        if (this.#logLevel >= logLevels.INFO) {
            this.#log('log', message)
        }
    }

    reportError (code, description) {
        this.error(`${CLICKY_ERROR_PREFIX} ${code}: ${description}`)
    }
}

