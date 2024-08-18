import { StorageManager } from './storage';
import {
    CHARGED_AMOUNT,
    CHARGED_ID, CHARGED_ID_COOKIE_NAME,
    CUSTOMER_EMAIL,
    CUSTOMER_ID, CUSTOMER_PHONE,unsupportedKeyCharRegex,unsupportedValueCharRegex 
} from "./constants";


export const isString = (input) => {
    return (typeof input === 'string' || input instanceof String)
}

export const isObject = (input) => {
    // TODO: refine
    return Object.prototype.toString.call(input) === '[object Object]'
}

export const isDateObject = (input) => {
    return typeof (input) === 'object' && (input instanceof Date)
}

export const isNumber = (n) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n) && typeof n === 'number'
}

export const isObjectEmpty = (obj) => {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) { return false }
    }
    return true
}
let _globalChargedId

export const removeUnsupportedChars = (o, logger) => {
    // keys can't be greater than 1024 chars, values can't be greater than 1024 chars
    if (typeof o === 'object') {
        for (const key in o) {
            if (o.hasOwnProperty(key)) {
                const sanitizedVal = removeUnsupportedChars(o[key], logger)
                let sanitizedKey
                sanitizedKey = sanitize(key, unsupportedKeyCharRegex)
                if (sanitizedKey.length > 1024) {
                    sanitizedKey = sanitizedKey.substring(0, 1024)
                    logger.reportError(520, sanitizedKey + '... length exceeded 1024 chars. Trimmed.')
                }
                delete o[key]
                o[sanitizedKey] = sanitizedVal
            }
        }
    } else {
        let val

        if (isString(o)) {
            val = sanitize(o, unsupportedValueCharRegex)
            if (val.length > 1024) {
                val = val.substring(0, 1024)
                logger.reportError(521, val + '... length exceeded 1024 chars. Trimmed.')
            }
        } else {
            val = o
        }
        return val
    }
    return o
}

export const isValueValid = (value) => {
    if (value === null || value === undefined || value === 'undefined') {
        return false
    }
    return true
}

export const sanitize = (input, regex) => {
    return input.replace(regex, '')
}

export const isEventStructureFlat = (eventObj) => {
    // Events cannot have nested structure or Arrays
    if (isObject(eventObj)) {
        for (var key in eventObj) {
            if (eventObj.hasOwnProperty(key)) {
                if (isObject(eventObj[key]) || Array.isArray(eventObj[key])) {
                    return false
                } else if (isDateObject(eventObj[key])) {
                    eventObj[key] = convertToWZRKDate(eventObj[key])
                }
            }
        }
        return true
    }
    return false
}

export const isChargedEventStructureValid = (chargedObj, logger) => {
    if (isObject(chargedObj)) {
        for (var key in chargedObj) {
            if (chargedObj.hasOwnProperty(key)) {
                if (key === 'Items') {
                    if (!Array.isArray(chargedObj[key])) {
                        return false
                    }

                    if (chargedObj[key].length > 50) {
                        logger.reportError(522, 'Charged Items exceed 50 limit. Actual count: ' + chargedObj[key].length)
                    }

                    for (var itemKey in chargedObj[key]) {
                        if (chargedObj[key].hasOwnProperty(itemKey)) {
                            if (!isObject(chargedObj[key][itemKey]) || !isEventStructureFlat(chargedObj[key][itemKey])) {
                                return false
                            }
                        }
                    }
                } else {
                    if (isObject(chargedObj[key]) || Array.isArray(chargedObj[key])) {
                        return false
                    } else if (isDateObject(chargedObj[key])) {
                        chargedObj[key] = convertToWZRKDate(chargedObj[key])
                    }
                }
            }
        }

        if (!isValueValid(chargedObj[CHARGED_ID]) || !isValueValid(chargedObj[CHARGED_AMOUNT])) {
            logger.info('Seem you are missing Charged ID or Amount, just an inform message')
        }

        if (isString(chargedObj[CHARGED_ID]) || isNumber(chargedObj[CHARGED_ID])) {
            // save charged Id
            const chargedId = chargedObj[CHARGED_ID] + '' // casting chargedId to string

            if (typeof _globalChargedId === 'undefined') {
                _globalChargedId = StorageManager.readFromLSorCookie(CHARGED_ID_COOKIE_NAME) + ''
            }

            if (typeof _globalChargedId !== 'undefined' && _globalChargedId.trim() === chargedId.trim()) {
                // drop event- duplicate charged id
                logger.error('Duplicate charged Id - Dropped' + chargedObj)
                return false
            }
            _globalChargedId = chargedId
            StorageManager.saveToLSorCookie(CHARGED_ID_COOKIE_NAME, chargedId)
        }
        return true
    } // if object (chargedObject)
    return false
}


export const isIdentifyEventStructuredValue = (identifyObj, logger) => {
    if (!isValueValid(identifyObj[CUSTOMER_ID])) {
        logger.error('Customer ID is missing')
        return false
    }
    if (!isValueValid(identifyObj[CUSTOMER_EMAIL]) || !isValueValid(identifyObj[CUSTOMER_PHONE])) {
        logger.error('Seem you are missing Email or Phone, just an inform message')
    }

    return true
}

export const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

export const getNow = () => {
    return Math.floor(Date.now() / 1000);
};

export const convertToWZRKDate = (dateObj) => {
    return ('$D_' + Math.round(dateObj.getTime() / 1000));
};

export const setDate = (dt) => {
    if (isDateValid(dt)) {
        return '$D_' + dt;
    }
};

export const isDateValid = (date) => {
    const matches = /^(\d{4})(\d{2})(\d{2})$/.exec(date);
    if (matches === null) return false;
    const y = parseInt(matches[1], 10);
    const m = parseInt(matches[2], 10) - 1;
    const d = parseInt(matches[3], 10);
    const composedDate = new Date(y, m, d);
    return composedDate.getDate() === d && composedDate.getMonth() === m && composedDate.getFullYear() === y;
};

export const isMobileWeb = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

