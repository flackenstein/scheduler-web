import { alertConstants } from '../constants';

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'success',
                message: action.message,
                duration: 2
            };
        case alertConstants.ERROR:
            return {
                type: 'error',
                message: action.message,
                duration: 5
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}
