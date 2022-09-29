import * as Hapi from "@hapi/hapi";
import { CreateShout, UpdateShout } from "./shout";
import { ShoutService } from "./shoutService";
import Boom from "@hapi/boom";

export class ShoutController {
  public async create(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const requestBody: CreateShout = request.payload as CreateShout;
      const result = await new ShoutService().create(requestBody);
      return h.response(result).code(201);
    } catch (error) {
      request.log("error");
      return Boom.badImplementation(JSON.stringify(error));
    }
  }

  public async getAll(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const result = await new ShoutService().getAll();
      return h.response(result).code(200);
    } catch (error) {
      request.log("error");
      return Boom.badImplementation(JSON.stringify(error));
    }
  }
}
