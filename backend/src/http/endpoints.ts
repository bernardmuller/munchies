import userEndpoints from '../resources/users/endpoints';
import authEndpoints from '../resources/auth/endpoints';

export const endpoints = [...userEndpoints, ...authEndpoints];
