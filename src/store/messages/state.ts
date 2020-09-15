import { Message } from "../../types";

export const NAME = "messages";

export interface MessagesState {
  messages?: Message[]
  loading?: boolean
  error?: string
};

export const INITIAL_STATE: MessagesState = {
  messages: [] as Message[],
  loading: false
};

export default MessagesState;
