import HttpMethod from '../const/httpMethod';
import {processErrorResponse, processRequest, processSuccessResponse} from '../utils';


export default {
  async login({ email, password }) {
    const ep = {
      baseURL: process.env.REACT_APP_API_ROOT,
      url: '/login',
      method: HttpMethod.POST
    };

    try {
      const res = await processRequest(ep, { data: { email, password } });
      return processSuccessResponse(res);
    } catch (e) {
      processErrorResponse(e.response);
      return false;
    }
  },

  async register({ email, password}) {
    const ep = {
      baseURL: process.env.REACT_APP_API_ROOT,
      url: '/register',
      method: HttpMethod.POST
    };

    const payload = { email, password };

    try {
      const res = await processRequest(ep, { data: payload });
      return processSuccessResponse(res);
    } catch (e) {
      processErrorResponse(e.response);
      return false;
    }
  },

  async changePassword({ oldPassword, newPassword }) {
    const ep = {
      baseURL: process.env.REACT_APP_API_ROOT,
      url: '/profile/change-password',
      method: HttpMethod.PUT
    };

    const payload = { oldPassword, newPassword };

    try {
      const res = await processRequest(ep, { data: payload });
      return processSuccessResponse(res);
    } catch (e) {
      processErrorResponse(e.response);
      return false;
    }
  },



  async changeProfile({ name, phone, email, position }) {
    const ep = {
      baseURL: process.env.REACT_APP_API_ROOT,
      url: '/profile',
      method: HttpMethod.PUT
    };

    const payload = { name, phone, email, position };

    try {
      const res = await processRequest(ep, { data: payload });
      return processSuccessResponse(res);
    } catch (e) {
      processErrorResponse(e.response);
      return false;
    }
  },

  async refreshToken(token) {
    const ep = {
      baseURL: process.env.REACT_APP_API_ROOT,
      url: '/refresh',
      method: HttpMethod.POST,
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    try {
      const res = await processRequest(ep);
      return processSuccessResponse(res);
    } catch (e) {
      processErrorResponse(e.response);
      return false;
    }
  },

  async getProfile() {
    const ep = {
      baseURL: process.env.REACT_APP_API_ROOT,
      url: '/profile',
      method: HttpMethod.GET
    };

    try {
      const res = await processRequest(ep);
      return processSuccessResponse(res);
    } catch (e) {
      processErrorResponse(e.response);
      return false;
    }
  },


};

