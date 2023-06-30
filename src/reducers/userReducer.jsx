import Types from "../actions/types";

const State = {
    logged: false,
    _id: "",
    username: "",
    email: "",
    role: ""
}

const userReducer = (state = State, { type, payload }) => {
    switch ( type ) {
        case Types.auth.signIn:
            console.log(payload)
            return state = {
                _id: payload._id,
                email: payload.email,
                username: payload.username,
                role: payload.role,
                logged: true
            }

        default:
            return state
    }
}

export default userReducer