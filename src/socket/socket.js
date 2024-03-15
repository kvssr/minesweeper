import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
// process.env.NODE_ENV === "production" ? undefined : "https://kevinvisser.nl";

export const socket = io(URL, {
  // path: "/app",
  autoConnect: false,
});
