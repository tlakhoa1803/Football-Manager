import { TARGET_DOMAIN, TARGET_PROTOCOL } from '../util/constants'

export default class Account {
    #accountId
    #dcSdkversion = ''
    #appVersion = ''

    constructor ({ id } = {}) {
        this.id = id
    }

    get id () {
        return this.#accountId
    }

    set id (accountId) {
        this.#accountId = accountId
    }

    get dcSDKVersion () {
        return this.#dcSdkversion
    }

    set dcSDKVersion (dcSDKVersion) {
        this.#dcSdkversion = dcSDKVersion
    }

    get appVersion() {
        return this.#appVersion
    }

    set appVersion(version) {
        this.#appVersion = version
    }

    get dataPostURL () {
        return `${TARGET_PROTOCOL}://${TARGET_DOMAIN}/v1/single?`
    }

}
