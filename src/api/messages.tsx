import { Message, VISIBILITY } from "../types";

let messages: Message[] = [
    {
        id: 1,
        text: 'example text',
        visibility: VISIBILITY.PUBLIC,
    },
    {
        id: 2,
        text: 'exemple 2',
        visibility: VISIBILITY.PRIVATE,
    }
];

export async function getMessages() {
    return Promise.resolve(messages);
}

export async function postMessage(message: Message) {
    messages = [...messages, message]; // don't mutate state
    return Promise.resolve(messages);
}

export async function deleteMessage(message: Message) {
    const idx = messages.indexOf(message);
    messages.slice(0, idx).push(...messages.splice(idx + 1));
    return Promise.resolve(messages);
}