"use strict";

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import * as dotenv from "dotenv";
import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import { shoutRoutes } from "./shout/shoutRoutes";
import { authRoutes } from "./auth/authRoutes";
import Bell from "@hapi/bell";
import Cookie from "@hapi/cookie";

dotenv.config();
export let server: Server;

export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // an array of origins or 'ignore'
      },
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

  await server.register(Bell);
  await server.register(Cookie);

  server.auth.strategy("session", "cookie", {
    cookie: {
      password: "cookie_encryption_password_securesuper-secure-cookchars",
      isSecure: false,
      name: "auth",
    },
    redirectTo: "/login",
  });


  server.auth.strategy("google", "bell", {
    provider: "google",
    password: "cookie_encryption_password_secure",
    isSecure: false,
    clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    location: server.info.uri,
    isSameSite: "Lax",
  });

  await server.register(plugins, { once: true });
  await server.register([shoutRoutes, authRoutes]);

  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
