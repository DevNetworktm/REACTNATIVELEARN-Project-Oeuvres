const Types = {
    auth: {
        signIn: "signIn"
    }
}

/**
 *
 * @param {Types} type
 * @param args
 */
export function ReturnAction(type, args){
    return {
        type,
        payload: args
    }
}

export default Types