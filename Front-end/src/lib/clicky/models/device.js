import { isValueValid } from '../util/validator'
import { StorageManager } from '../util/storage'
import { COOKIE_EXPIRY, CLIENT_ID} from '../util/constants'
import { v4 as uuid } from 'uuid';

export default class DeviceManager {
    #logger
    clientId

    constructor ({ logger }) {
        this.#logger = logger
        this.clientId = this.getClientId()
    }

    #buildClientId() {
        return  uuid();
    }

    getClientId() {
        let id = ""
        if (isValueValid(this.clientId)) {
            StorageManager.createCookie(CLIENT_ID, id, COOKIE_EXPIRY, window.location.hostname)
            return this.clientId
        }

        id = StorageManager.readCookie(CLIENT_ID)
        if (!isValueValid(id)) {
            id = this.#buildClientId()
            this.#logger.debug('Has added clientId ' + id)
        }

        if (isValueValid(id)) {
            StorageManager.createCookie(CLIENT_ID, id, COOKIE_EXPIRY, window.location.hostname)
        }

        return id
    }

}
