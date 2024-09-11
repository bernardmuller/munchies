import axios from "axios";
import httpClient from "../httpClient";
// import { requireBaseURL, requireHeaders } from "../shared/utils";

export async function createIngredient(newIngredientData: {
  name: string;
  categoryId: number;
}) {
  return await axios
    .post(`http://localhost:8001/ingredients`, newIngredientData)
    .then((response) => {
      return response.data;
    });
}

type Ingredient = {
  id: string;
  name: string;
  categoryName: string;
};

export async function fetchIngredients({
  page,
  searchTerm,
  limit,
}: {
  page?: string;
  searchTerm?: string;
  limit?: string;
}): Promise<Ingredient[]> {
  return await axios
    .get(`http://localhost:8001/ingredients`)
    .then((response) => response.data);
}

// export async function fetchIngredient(id: string) {
// 	return await axios({
// 		method: "GET",
// 		url: `${requireBaseURL()}/ingredients/${id}`,
// 		headers: await requireHeaders(),
// 	}).then((response) => response.data);
// }
//
// export async function updateIngredient({
// 	id,
// 	data,
// }: {
// 	id: string;
// 	data: any;
// }) {
// 	return await axios({
// 		method: "PUT",
// 		url: `${requireBaseURL()}/ingredients/${id}`,
// 		headers: await requireHeaders(),
// 		data: data,
// 	}).then((response) => response.data);
// }
