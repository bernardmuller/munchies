import { apiEndpoint } from 'common/constants';
import { Api } from './Api';
import { resolveRejected } from './apiUtils';

export const getUser = async (id: String, token: String) => {
  const url = `${apiEndpoint}users/${id}`;

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

export const updateUser = async (id: String, data: Object, token: String) => {
  const url = `${apiEndpoint}users/${id}`;
  try {
    const response = await Api.put(url, data, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ex;
  }
};
