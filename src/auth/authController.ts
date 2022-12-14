import * as Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { User } from "./auth";
import { authService } from "./authService";


const service = new authService()

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
    await service.registerUser(data);
    request.cookieAuth.set(data); // <-- new line to set the session cookie
    
    return h.response("Successfully logged In").code(200);
  }

  public async getUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const result = await service.getUser(request, h);
      return h.response(result).code(200);
    } catch (error) {
      request.log("error");
      return Boom.badImplementation(JSON.stringify(error));
    }
  }

  public async logOut(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      request.cookieAuth.clear()
      return h.response("logged out successfuly").code(200);
    } catch (error) {
      request.log("error");
      return Boom.badImplementation(JSON.stringify(error));
    }
  }
}
