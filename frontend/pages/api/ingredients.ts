import axios from 'axios';
import { requireBaseURL, requireHeaders } from '../../shared/utils';

export async function createIngredient() {
  return await axios({
    method: 'POST',
    url: `${requireBaseURL()}/ingredients`,
    headers: requireHeaders(),
  }).then(response => response.data);
}

export async function fetchIngredients() {
  return await axios({
    method: 'GET',
    url: `${requireBaseURL()}/ingredients`,
    headers: requireHeaders(),
  }).then(response => response.data);
}

export async function fetchMeal(id: string) {
  return await axios({
    method: 'GET',
    url: `${requireBaseURL()}/meals/${id}`,
    headers: requireHeaders(),
  }).then(response => response.data);
}

export async function updateMeal({ id, data }: { id: string; data: any }) {
  return await axios({
    method: 'PUT',
    url: `${requireBaseURL()}/meals/${id}`,
    headers: requireHeaders(),
    data: data,
  }).then(response => response.data);
}
