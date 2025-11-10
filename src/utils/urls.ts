const isLocal = window.location.hostname !== "localhost";

const base = isLocal ? "http://localhost:8080" : "https://telsoglobal.com";

const api = `${base}/api/v1`;
const media = `${api}/media`;

export default { base, api, media };
