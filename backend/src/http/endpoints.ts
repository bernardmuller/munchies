import userEndpoints from '../resources/users/endpoints';
import authEndpoints from '../resources/auth/endpoints';
import menuEndpoints from '../resources/menus/endpoints';

export const endpoints = [...userEndpoints, ...menuEndpoints, ...authEndpoints];
