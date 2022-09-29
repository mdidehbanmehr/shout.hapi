import * as Hapi from "@hapi/hapi";

export interface User extends Hapi.AuthCredentials {
    raw:{
        name: string,
        email: string,
        picture: string,
    }
}
