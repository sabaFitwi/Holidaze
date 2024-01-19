import { baseUrl } from "../api";

const Url = baseUrl;
const endPoint = `/auth/login`;

export async function loginUser(users) {
  console.log(users);

  return fetch(Url + endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(users),
  }).then((data) => data.json());
}
