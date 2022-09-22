"use strict";

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import * as dotenv from "dotenv";
import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import shoutRoutes from "./shout/shoutRoutes";

dotenv.config();
export let server: Server;

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
  });
  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: "Shout.api Docs",
    },
    tags: [
      {
        name: "petstore",
        description: "the petstore api",
      },
      {
        name: "pet",
        description: "the pet api",
      },
    ],
    grouping: "tags",
    sortEndpoints: "ordered",
  };

  const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ];

  await server.register(plugins, { once: true });
  await server.register([shoutRoutes]);
  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
