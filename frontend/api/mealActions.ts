import { apiEndpoint } from 'common/constants';
import { resolveRejected } from './apiUtils';
import { Api } from './Api';

export const createMeal = async (token: String) => {
  const url = `${apiEndpoint}meals`;
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

export const updateMeal = async (id: any, data: Object, token: String) => {
  const url = `${apiEndpoint}meals/${id}`;
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

export const getMeals = async (token: String) => {
  const url = `${apiEndpoint}meals`;

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

export const getMeal = async (id: any, token: String) => {
  const url = `${apiEndpoint}meals/${id}`;
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

export const removeIngredient = async (
  id: any,
  ingredientId: any,
  token: String
) => {
  const url = `${apiEndpoint}meals/${id}/remove`;

  try {
    const response = await Api.post(
      url,
      { ingredient_id: ingredientId },
      token
    );
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ex;
  }
};

export const addIngredient = async (
  id: any,
  ingredientId: String,
  token: String
) => {
  const url = `${apiEndpoint}meals/${id}/add`;

  try {
    const response = await Api.post(
      url,
      { ingredient_id: ingredientId },
      token
    );
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ex;
  }
};

export const deleteMeal = async (id: String, token: String) => {
  const url = `${apiEndpoint}meals/${id}`;

  try {
    const response = await Api.delete(url, token);
    return response;
  } catch (ex: any) {
    const ret = resolveRejected(ex);
    if (ex && ex.response && ex.response.status === 401) {
      ret.message = 'Something went wrong';
    }
    return ex;
  }
};
