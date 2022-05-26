import useFetch from "./../hooks/useFetch";
const endPoint = "/markets";

export async function GetAllMarkets({ page }) {
  const apiCall = await useFetch().get(`${endPoint}${`?page=${page}`}`);
  return apiCall;
}

export async function GetAllMarketsChart({ page }) {
  const apiCall = await useFetch().get(`${endPoint}/charts${`?page=${page}`}`);
  return apiCall;
}
