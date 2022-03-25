export const BASEURL =
  process.env.REACT_APP_ENV === "dev"
    ? "http://localhost:3000"
    : "https://rankmatch.herokuapp.com";
