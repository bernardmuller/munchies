import axios from 'axios';
import { requireBaseURL, requireHeaders } from '../../shared/utils';

export async function createMeal() {
  return await axios({
    method: 'POST',
    url: `${requireBaseURL()}/meals`,
    headers: requireHeaders(),
  }).then(response => response.data);
}

export async function fetchMenus() {
  return await axios({
    method: 'GET',
    url: `${requireBaseURL()}/menus`,
    headers: requireHeaders(),
  }).then(response => response.data);
}

export async function fetchMenu(id: string) {
  return await axios({
    method: 'GET',
    url: `${requireBaseURL()}/menus/${id}`,
    headers: requireHeaders(),
  }).then(response => response.data);
}

export async function updateMeal({ id, data }: { id: string; data: any }) {
  console.log(id, data);
  return await axios({
    method: 'PUT',
    url: `${requireBaseURL()}/meals/${id}`,
    headers: requireHeaders(),
    data: data,
  }).then(response => response.data);
}

export async function addIngredientToMeal({
  mealId,
  ingredientId,
}: {
  mealId: string;
  ingredientId: string;
}) {
  return await axios({
    method: 'POST',
    url: `${requireBaseURL()}/meals/${mealId}/ingredients/add`,
    headers: requireHeaders(),
    data: { ingredientId: ingredientId },
  }).then(response => response.data);
}

export async function removeIngredientFromMeal({
  mealId,
  ingredientId,
}: {
  mealId: string;
  ingredientId: string;
}) {
  return await axios({
    method: 'POST',
    url: `${requireBaseURL()}/meals/${mealId}/ingredients/remove`,
    headers: requireHeaders(),
    data: { ingredientId: ingredientId },
  }).then(response => response.data);
}

export async function addDirectionToMeal({
  mealId,
  newDirection,
}: {
  mealId: string;
  newDirection: string;
}) {
  return await axios({
    method: 'PUT',
    url: `${requireBaseURL()}/meals/${mealId}/directions/add`,
    headers: requireHeaders(),
    data: { direction: newDirection },
  }).then(response => response.data);
}

export async function removeDirectionFromMeal({
  mealId,
  directionIndex,
}: {
  mealId: string;
  directionIndex: number;
}) {
  return await axios({
    method: 'PUT',
    url: `${requireBaseURL()}/meals/${mealId}/directions/remove`,
    headers: requireHeaders(),
    data: { directionIndex: directionIndex },
  }).then(response => response.data);
}
