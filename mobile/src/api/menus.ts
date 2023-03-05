import axios from 'axios';
import { requireBaseURL, requireHeaders } from '../shared/utils';

export async function createMeal() {
  return await axios({
    method: 'POST',
    url: `${requireBaseURL()}/meals`,
    headers: await requireHeaders(),
  }).then(response => response.data);
}

export async function fetchMenus() {
  return await axios({
    method: 'GET',
    url: `${requireBaseURL()}/menus`,
    headers: await requireHeaders(),
  }).then(response => response.data);
}

export async function fetchMenu(id: string) {
  return await axios({
    method: 'GET',
    url: `${requireBaseURL()}/menus/${id}`,
    headers: await requireHeaders(),
  }).then(response => response.data);
}

export async function updateMeal({ id, data }: { id: string; data: any }) {
  console.log(id, data);
  return await axios({
    method: 'PUT',
    url: `${requireBaseURL()}/meals/${id}`,
    headers: await requireHeaders(),
    data: data,
  }).then(response => response.data);
}

export async function addMealToMenu({ mealId, menuId }: { mealId: string; menuId: string }) {
  return await axios({
    method: 'POST',
    url: `${requireBaseURL()}/menus/${menuId}/meals/add`,
    headers: await requireHeaders(),
    data: { mealId: mealId },
  }).then(response => response.data);
}

export async function removeMealFromMenu({ mealId, menuId }: { mealId: string; menuId: string }) {
  return await axios({
    method: 'POST',
    url: `${requireBaseURL()}/menus/${menuId}/meals/remove`,
    headers: await requireHeaders(),
    data: { mealId: mealId },
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
    headers: await requireHeaders(),
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
    headers: await requireHeaders(),
    data: { directionIndex: directionIndex },
  }).then(response => response.data);
}
