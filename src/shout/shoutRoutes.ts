import { ShoutController } from "./shoutController";
import * as Hapi from "@hapi/hapi";
import Joi from "joi";

// create instance of controller
const controller = new ShoutController();

const userSchema = Joi.object({
  author: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  profilePicture: Joi.string(),
});

// configure the routes
export const shoutRoutes = {
  name: "users",
  register: async (server: Hapi.Server) => {
    server.route([
      {
        method: "POST",
        path: "/shout",
        handler: controller.create,
        options: {
          tags: ["api"],
          plugins: {
            "hapi-swagger": {},
          },
          auth: "session",
          validate: {
            payload: userSchema,
            failAction: async (request, h, err) => {
              console.log(err);
              throw err;
            },
          },
        },
      },
      {
        method: "GET",
        path: "/shout",
        handler: controller.getAll,
        options: {
          tags: ["api"],
        },
      },
    ]);
  },
};
