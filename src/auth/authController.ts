import * as Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { User } from "./auth";
import { authService } from "./authService";

export class AuthController {
  public async login(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    if (!request.auth.isAuthenticated) {
      return Boom.badImplementation(JSON.stringify(request.auth.error.message));
    }

    const user = request.auth.credentials.profile as User;
    const data = {
      name: user.raw.name,
      email: user.raw.email,
      picture: user.raw.picture,
    };
    await new authService().registerUser(data);
    request.cookieAuth.set(data); // <-- new line to set the session cookie
    return h.response(data).code(200);

  }

  public async getUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const result = await new authService().getUser(request, h);
      return h.response(result).code(200);
    } catch (error) {
      request.log("error");
      return Boom.badImplementation(JSON.stringify(error));
    }
  }
}
