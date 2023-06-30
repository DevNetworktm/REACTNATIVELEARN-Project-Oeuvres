import Types, { ReturnAction } from "./types";

export function SignIn(user){
    return ReturnAction(Types.auth.signIn, user)
}