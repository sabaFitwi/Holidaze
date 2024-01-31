import Headers from "../hooks/useHeader";
import { baseUrl } from "../api";

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
