import {isMobileWeb, isValueValid, removeUnsupportedChars} from "../util/validator";
import RequestDispatcher, {addToURL} from "../util/requestDispatcher";
import {EVT_PUSH} from "../util/constants";
import { getLatLong, getReferrer, getUserAgent} from "./event";

export default class RequestManager {
  #logger
  #account
  #device

  constructor ({ logger, account, device }) {
    this.#logger = logger
    this.#account = account
    this.#device = device

    RequestDispatcher.logger = logger
    RequestDispatcher.device = device
  }

  addSystemDataToObject (dataObject, ignoreTrim) {
    if (typeof ignoreTrim === 'undefined') {
      dataObject = removeUnsupportedChars(dataObject, this.#logger)
    }
    dataObject.key = this.#account.id
    if (isValueValid(this.#device.clientId)) {
      dataObject.client_id = this.#device.clientId
    }
    let maxLen = 120
    dataObject.user_agent = getUserAgent()
    dataObject.platform = isMobileWeb() ? "web_mobile" : "web"
    let referrerDomain = getReferrer()
    referrerDomain = referrerDomain.length > maxLen ? referrerDomain.substring(0, maxLen) : referrerDomain
    dataObject.referrer = referrerDomain
    dataObject.sdk_version = this.#account.dcSDKVersion
    dataObject.app_version = this.#account.appVersion
    getLatLong(dataObject)

    console.log(dataObject)
    return dataObject
  }

  saveAndFireRequest (url, data) {
    return RequestDispatcher.fireRequest(url, data)
  }

  processEvent (data) {
    data = this.addSystemDataToObject(data, undefined)
    let pageLoadUrl = this.#account.dataPostURL
    return this.saveAndFireRequest(pageLoadUrl, data)
  }

}
