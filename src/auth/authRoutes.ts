import Bell from "@hapi/bell";
import * as Hapi from "@hapi/hapi";
import Joi from "joi";
import { AuthController } from "./authController";

const controller = new AuthController();

export const authRoutes = {
  name: "login",
  register: async (server: Hapi.Server) => {
    server.route([
      {
        method: ["GET","POST"], // Must handle both GET and POST
        path: "/login", // The callback endpoint registered with the
        handler: controller.login,
        options: {
          auth: {
            strategy: "google",
            mode: "try",
          },
          tags: ["api"],
          plugins: {
            "hapi-swagger": {},
          },
        },
      },
      {
        method: ["GET"], // Must handle both GET and POST
        path: "/get-user", // The callback endpoint registered with the
        handler: controller.getUser,
        options: {
          auth: "session",
          tags: ["api"],
          plugins: {
            "hapi-swagger": {},
          },
        },
      },
      {
        method: ["Post"], // Must handle both GET and POST
        path: "/logOut", // The callback endpoint registered with the
        handler: controller.logOut,
        options: {
          auth: "session",
          tags: ["api"],
          plugins: {
            "hapi-swagger": {},
          },
        },
      },
    ]);
  },
};
