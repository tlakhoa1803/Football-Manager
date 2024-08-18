import {isObject, isString, sanitize, getNow} from "../util/validator";
import {EVENT_ERROR} from "../util/constants";
import {SYSTEM_EVENTS, unsupportedKeyCharRegex} from "../util/constants";
import {isChargedEventStructureValid, isEventStructureFlat, isIdentifyEventStructuredValue} from "../util/validator";

export const getURLParams = (url) => {
    const urlParams = {}
    const idx = url.indexOf('?')

    if (idx > 1) {
        const uri = url.substring(idx + 1)
        let match
        const pl = /\+/g // Regex for replacing addition symbol with a space
        const search = /([^&=]+)=?([^&]*)/g
        const decode = function (s) {
            let replacement = s.replace(pl, ' ')
            try {
                replacement = decodeURIComponent(replacement)
            } catch (e) {
                // eat
            }
            return replacement
        }
        match = search.exec(uri)
        while (match) {
            urlParams[decode(match[1])] = decode(match[2])
            match = search.exec(uri)
        }
    }
    return urlParams
}

export const getDomain = (url) => {
    if (url === '') return ''
    let a = document.createElement('a')
    a.href = url
    return a.hostname
}

export const getUserAgent = () => {
    return navigator.userAgent
}

export const getReferrer = () => {
    return getDomain(document.referrer)
}

export const getLatLong = (data) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                data.latitude = latitude
                data.longitude = longitude
            },
        );
    } else {
    }
}

export default class EventHandler extends Array {
    #logger
    #request
    #account
    #device

    constructor({logger, request, account, device}) {
        super();
        this.#logger = logger
        this.#request = request
        this.#account = account
        this.#device = device
    }

    push(...eventsArr) {
        if (!this.#account.id) {
            this.#logger.reportError(510, 'sdk was not initialised')
            return 0
        }
        if (!this.#device.clientId) {
            this.#logger.reportError(510, 'device id was not initialised')
        }

        this.#processEventArray(eventsArr)
        return 0
    }

    #processEventArray(eventsArr) {
        if (Array.isArray(eventsArr)) {
            while (eventsArr.length > 0) {
                let eventName = eventsArr.shift();
                if (!isString(eventName)) {
                    this.#logger.error(EVENT_ERROR)
                    continue
                }
                if (eventName.length > 100) {
                    eventName = eventName.substring(0, 100)
                    this.#logger.reportError(510, eventName + '... length exceeded 100 chars. Trimmed.')
                }
                if (SYSTEM_EVENTS.includes(eventName)) {
                    this.#logger.reportError(513, eventName + ' is a restricted system event. It cannot be used as an event name.')
                    continue
                }
                const data = {}
                data.type = 'event'
                data.event_type = sanitize(eventName, unsupportedKeyCharRegex)
                data.created_at = getNow()

                if (eventsArr.length !== 0) {
                    const eventObj = eventsArr.shift()
                    if (!isObject(eventObj)) {
                        // put it back if it is not an object
                        eventsArr.unshift(eventObj)
                    } else {
                        if (eventName === 'Charged') {
                            if (!isChargedEventStructureValid(eventObj, this.#logger)) {
                                this.#logger.reportError(511, 'Charged event structure invalid. Not sent.')
                                continue
                            }

                        } else if (eventName === "Identify") {
                            if (!isIdentifyEventStructuredValue(eventObj, this.#logger)) {
                                this.#logger.reportError(511, 'Identify event structure invalid. Not sent.')
                                continue
                            }
                        } else {
                            if (!isEventStructureFlat(eventObj)) {
                                this.#logger.reportError(512, eventName + ' event structure invalid. Not sent.')
                                continue
                            }
                        }
                        data.event_properties = eventObj
                    }
                }
                this.#request.processEvent(data)
            }
        }
    }


}
