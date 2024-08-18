import Accounts from "./models/accounts";
import {Logger, logLevels} from "./models/logger";
import DeviceManager from "./models/device";
import EventHandler, {getDomain, getURLParams} from "./models/event";
import RequestManager from "./models/request";
import {EMBED_ERROR, UTM_VISITED} from "./util/constants";


export default class Clicky {
    #logger
    #device
    #request
    #account
    #onloadcalled


    constructor(clicky = {}) {
        this.#onloadcalled = 0
        this.#logger = new Logger(logLevels.INFO)
        this.#account = new Accounts(clicky.account?.[0])
        this.#device = new DeviceManager({
            logger: this.#logger
        })

        this.#request = new RequestManager({
            logger: this.#logger,
            account: this.#account,
            device: this.#device
        })

        this.event = new EventHandler({
            logger: this.#logger,
            request: this.#request,
            account: this.#account,
            device: this.#device
        })

        if (clicky.account?.[0].id) {
            this.init()
        }

    }
    pageChanged () {
        const currLocation = window.location.href
        const urlParams = getURLParams(currLocation.toLowerCase())

        let data = {}
        let referrerDomain = getDomain(document.referrer)
        console.log("referrerDomain", referrerDomain)
        console.log("window.location.hostname", window.location.hostname)

        if (window.location.hostname !== referrerDomain) {
            const maxLen = 120
            let utmSource = urlParams.utm_source
            if (typeof utmSource !== 'undefined') {
                utmSource = utmSource.length > maxLen ? utmSource.substring(0, maxLen) : utmSource
                data.utm_source = utmSource
                data.event_type = UTM_VISITED
            }

            let utmMedium = urlParams.utm_medium
            if (typeof utmMedium !== 'undefined') {
                utmMedium = utmMedium.length > maxLen ? utmMedium.substring(0, maxLen) : utmMedium
                data.utm_medium = utmMedium // utm_medium
            }

            let utmCampaign = urlParams.utm_campaign
            if (typeof utmCampaign !== 'undefined') {
                utmCampaign = utmCampaign.length > maxLen ? utmCampaign.substring(0, maxLen) : utmCampaign
                data.utm_campaign = utmCampaign // utm_campaign
            }
            let utmItemId = urlParams.utm_item_id
            if (typeof utmItemId !== 'undefined') {
                utmItemId = utmItemId.length > maxLen ? utmItemId.substring(0, maxLen) : utmItemId
                data.utm_item_id = utmItemId // utmItemId
            }
        }

        data = this.#request.addSystemDataToObject(data, undefined)
        data.cpg = currLocation

        console.log(this.#account.dataPostURL)
        let pageLoadUrl = this.#account.dataPostURL
        return this.#request.saveAndFireRequest(this.#account.dataPostURL, data)
    }

    init(accountId) {
        if (this.#onloadcalled === 1) {
            return
        }

        if (!this.#account.id) {
            if (!accountId) {
                this.#logger.error(EMBED_ERROR)
                return
            }
            this.#account.id = accountId
        }

        this.pageChanged()

        this.#onloadcalled = 1
    }
}
