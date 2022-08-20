import { apiEndpoint } from '../common/constants';
import { Api } from './Api';
import { resolveResponse, resolveRejected } from './apiUtils';

export const login = async (emailAddress: String, password: String) => {
  const url = `${apiEndpoint}auth/login`;
  try {
    const ret = await Api.post(apiEndpoint, { emailAddress, password }, '');
    return await ret.json();
    // return resolveResponse(ret);
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Invalid username or password';
    }
    return ret;
  }
};

export const checkAuth = async (token: String) => {
  const url = `${apiEndpoint}auth`;

  try {
    const response = await Api.get(url, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ex;
  }
};
