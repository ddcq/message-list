import { Message } from "../types";
import request from "./_request";

export const getMessages = () =>
    request.get<{}, Message[]>("/messages");

export const postMessage = (message: Message) =>
    request.post<Message, Message[]>("/messages", message);

export const deleteMessage = (message: Message) =>
    request.delete<Message, Message[]>(`/messages/${message.id}`);

export const deleteAllMessages = () =>
    request.delete<{}, Message[]>("/messages");
