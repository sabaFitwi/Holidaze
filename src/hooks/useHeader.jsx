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
