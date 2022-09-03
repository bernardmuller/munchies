import { apiEndpoint } from 'common';
import { Api } from './Api';

type ApiMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type ApiAction = {
  action: string;
  url: string;
  method: ApiMethod;
};

const API_ACTIONS: ApiAction[] = [
  { action: 'login', url: `${apiEndpoint}auth/login`, method: 'post' },
  { action: 'register', url: `${apiEndpoint}auth/register`, method: 'post' },
  { action: 'getMeal', url: `${apiEndpoint}meals/:id`, method: 'get' },
  { action: 'getMeals', url: `${apiEndpoint}meals`, method: 'get' },
];

const createConnectionURL = (
  userAction: string,
  args: { id: string | undefined } | undefined
) => {
  let found = false;
  for (const action of API_ACTIONS) {
    if (action.action === userAction) {
      if (action.url.includes(':id')) {
        if (!args)
          throw new Error(
            `No 'id' passed to 'createConnectionURL()' for action: '${userAction}'`
          );
        if (args) {
          const actionURL = action.url.replace(':id', args?.id);
          found = true;
          return actionURL;
        } else {
          throw new Error(`no args found`);
        }
      }
      return action.url;
    }
  }
  if (!found) {
    throw new Error(
      `action "${userAction}" not found, check apiURLs for valid actions.`
    );
  }
};

const createApiRequest = async (
  userAction: string,
  args: { id: string | undefined } | undefined,
  data: any | undefined
) => {
  const url = createConnectionURL(userAction, args);
  const apiAction = API_ACTIONS.find(action => action.action === userAction);
  const res = await Api[apiAction?.method](url, data);
  return res;
};

export const apiRequest = async (
  action: string,
  args: { id: string | undefined } | undefined,
  data: any | undefined
) => {
  return await createApiRequest(action, args, data);
};
