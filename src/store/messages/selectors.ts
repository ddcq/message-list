import RootState from "../root-state";
import { NAME } from "./state";

export const selectMessages = (state: RootState) => {
    return (state[NAME] || {}).messages;
}

export const selectLoading = (state: RootState) => {
    return (state[NAME] || {}).loading;
}

export const selectError = (state: RootState) => {
    return (state[NAME] || {}).error;
}
