import axios from "axios";
import {
  requireBaseURL,
  requireHeaders,
} from "../shared/utils";

export async function fetchGrocerylists() {
  return await axios({
    method: "GET",
    url: `${requireBaseURL()}/grocerylists`,
    headers: await requireHeaders(),
  })
    .then((response) => response.data)
    .catch((err) => console.log(err));
}

