import { apiEndpoint } from 'common/constants';
import { Api } from './Api';
import { resolveRejected } from './apiUtils';

export const checkItem = async (id: String, token: String) => {
  const url = `${apiEndpoint}items/${id}/check`;

  try {
    const response = await Api.put(url, {}, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ex;
  }
};

export const unCheckItem = async (id: String, token: String) => {
  const url = `${apiEndpoint}items/${id}/uncheck`;

  try {
    const response = await Api.put(url, {}, token);
    return response;
    //   return resolveResponse(response);
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ex;
  }
};
