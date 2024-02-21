/**
 * Function to generate headers for HTTP requests based on provided content type and authorization token.
 * @param {string} contentType - The content type of the request (e.g., 'application/json').
 * @returns {Object} An object containing headers for the HTTP request.
 */
const Headers = (contentType) => {
  const token = localStorage.getItem("Token");
  const headers = {};

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
export default Headers;
