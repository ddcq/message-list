import RootState from "../root-state";
import { NAME } from "./state";

export const selectMessages = (state: RootState) => {
    console.log("ddselect " + NAME + JSON.stringify(state));
    return (state[NAME] || {}).messages;
}
