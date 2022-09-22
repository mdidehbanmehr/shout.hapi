import { ShoutController } from "./shoutController";
import * as Hapi from "@hapi/hapi";
import Joi from "joi";

// create instance of controller
const controller = new ShoutController();

const userSchema = Joi.object({
  author: Joi.string().required(),
  email: Joi.string().required(),
  message: Joi.string().required(),
});

// configure the routes
const userRoutes = {
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

export default userRoutes;
