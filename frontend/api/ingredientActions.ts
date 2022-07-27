import { apiEndpoint } from 'common/constants';
import { resolveRejected } from './apiUtils';
import { Api } from './Api';

export const updateIngredient = async (
  id: any,
  data: Object,
  token: String
) => {
  const url = `${apiEndpoint}ingredients/${id}`;

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

export const getIngredients = async (token: String) => {
  const url = `${apiEndpoint}ingredients`;

  try {
    const response = await Api.get(url, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ret;
  }
};
