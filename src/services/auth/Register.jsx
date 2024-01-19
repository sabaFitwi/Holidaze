import { baseUrl } from "../api";

const Url = baseUrl;
const endPoint = `/auth/register`;

export async function registerUser(input) {
  console.log(input);

  try {
    const response = await fetch(Url + endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
