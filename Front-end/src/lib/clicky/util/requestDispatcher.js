import { isValueValid } from './validator';
export const addToURL = (url, k, v) => {
    return url + '&' + k + '=' + encodeURIComponent(v)
}
export default class RequestDispatcher {
    static logger;
    static device;
    static async #fireRequest(url, data) {
        if (!isValueValid(this.device.clientId)) {
            this.logger.debug('req dropped due to optout cookie: ' + this.device.clientId);
            return;
        }
        // Constructing the complete URL with parameters
        const completeURL = addToURL(url, 't', new Date().getTime());

        console.log(completeURL); // Check the constructed URL in console

        try {
            const response = await fetch(completeURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // assuming data should be sent as JSON
                },
                body: JSON.stringify(data)

            });

            // handle response as needed
            const responseData = await response.json();
            console.log(responseData);
            this.logger.debug('req snt -> url: ' + completeURL);
        } catch (error) {
            console.error('Error occurred while sending POST request:', error);
            // handle error
        }
    }
    static fireRequest(url, data) {
        return this.#fireRequest(url, data);
    }
}
