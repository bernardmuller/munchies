import { apiEndpoint } from 'common/constants';
import { Api } from './Api';
import { resolveRejected } from './apiUtils';

export const createMenu = async (token: String) => {
  const url = `${apiEndpoint}menus`;

  try {
    const response = await Api.post(url, {}, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ex;
  }
};

export const updateMenu = async (id: String, data: Object, token: String) => {
  const url = `${apiEndpoint}menus/${id}`;

  try {
    const response = await Api.put(url, data, token);
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

export const getMenus = async (token: String) => {
  const url = `${apiEndpoint}menus`;

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

export const getMenu = async (id: String, token: String) => {
  const url = `${apiEndpoint}menus/${id}`;

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

export const deleteMenu = async (id: any, token: String) => {
  const url = `${apiEndpoint}menus/${id}`;

  try {
    const response = await Api.delete(url, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ret;
  }
};

export const addMealsToMenu = async (id: any, data: Object, token: String) => {
  const url = `${apiEndpoint}menus/${id}/meals`;

  try {
    const response = await Api.post(url, data, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ret;
  }
};

export const addExtraItem = async (id: String, data: Object, token: String) => {
  const url = `${apiEndpoint}menus/${id}/extra`;

  try {
    const response = await Api.post(url, data, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ret;
  }
};
