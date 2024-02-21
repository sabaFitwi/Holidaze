import Headers from "../hooks/useHeader";
import { baseUrl } from "../api";

/**
 * Asynchronously fetches profile data for a given user.
 * @param {Object} users - Optional data about the user(s) to include in the request.
 * @returns {Promise<Object>} A Promise that resolves with the profile data fetched from the server.
 */
export async function getProfile(users) {
  const Url = baseUrl;

  const storedData = localStorage.getItem("UserData");

  const data = JSON.parse(storedData);

  const name = data.name;
  console.log(name);
  const endPoint = `/profiles/${name}?_bookings=true&_venues=true&_count`;

  return fetch(Url + endPoint, {
    method: "GET",
    headers: Headers("application/json"),
    body: JSON.stringify(users),
  }).then((data) => data.json());
}
