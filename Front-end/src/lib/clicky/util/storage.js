
export class StorageManager {

  static _isLocalStorageSupported () {
    return 'localStorage' in window && window.localStorage !== null && typeof window.localStorage.setItem === 'function'
  }

  static save (key, value) {
    if (!key || !value) {
      return false
    }
    if (this._isLocalStorageSupported()) {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
      return true
    }
  }

  static read (key) {
    if (!key) {
      return false
    }
    let data = null
    if (this._isLocalStorageSupported()) {
      data = localStorage.getItem(key)
    }
    if (data != null) {
      try {
        data = JSON.parse(data)
      } catch (e) {}
    }
    return data
  }

  static readCookie (name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let idx = 0; idx < ca.length; idx++) {
      let c = ca[idx]
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length)
      }
      // eslint-disable-next-line eqeqeq
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length))
      }
    }
    return null
  }

  static createCookie (name, value, seconds, domain) {
    let expires = ''
    let domainStr = ''
    if (seconds) {
      const date = new Date()
      date.setTime(date.getTime() + (seconds * 1000))

      expires = '; expires=' + date.toUTCString()
    }

    if (domain) {
      domainStr = '; domain=' + domain
    }

    value = encodeURIComponent(value)

    document.cookie = name + '=' + value + expires + domainStr + '; path=/'
  }

  static removeCookie (name, domain) {
    let cookieStr = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

    if (domain) {
      cookieStr = cookieStr + ' domain=' + domain + '; path=/'
    }

    document.cookie = cookieStr
  }

  static readFromLSorCookie (property) {
    let data

    if (this._isLocalStorageSupported()) {
      data = this.read(property)
    } else {
      data = this.readCookie(property)
    }

    if (data !== null && data !== undefined && !(typeof data.trim === 'function' && data.trim() === '')) {
      let value
      try {
        value = JSON.parse(decodeURIComponent(data))
      } catch (err) {
        value = decodeURIComponent(data)
      }
      return value
    }
  }

  static saveToLSorCookie (property, value) {
    if (value == null) {
      return
    }
    try {
      if (this._isLocalStorageSupported()) {
        this.save(property, encodeURIComponent(value))
      } else {
        this.createCookie(property, encodeURIComponent(value), 0, window.location.hostname)
      }
    } catch (e) {}
  }

}

