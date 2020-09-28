# Message List

[![Build Status](https://travis-ci.org/ddcq/message-list.svg?branch=master)](https://travis-ci.org/ddcq/message-list)

This application is a simple application to list messages and add new messages. It's based on [ReactMD](https://github.com/mlaursen/react-md), [Next.js](https://nextjs.org/), and Typescript.

directories:

-   [actions](./src/actions) contains the high level services called by the UI
-   [api](./src/api) contains the call function to the API

important files:

-   [\_variables.scss](./src/styles/_variables.scss) to override the default
    `react-md` theme and feature toggles
-   [app.scss](./src/styles/app.scss) global styles that conditionally apply the dark theme
    based on the user's OS preferences
-   [\_app.tsx](./src/pages/_app.tsx) uses a persistent layout. Do implement here the common feature of all pages, like `css` and `script` imports.
-   [Layout.tsx](./src/components/Layout/Layout.tsx) that initializes the `Layout` component from `react-md` with navigation items

For more information about ReactMD's features, styling, components, and API, check out
the [main documentation](https://react-md.dev).

## API

Sandbox URL : `https://msglist.getsandbox.com:443`

### Delete a single message

Delete a unique message for given id and returns the updated list without the deleted message.
If there is no message for the given id, the list isn't updated.

Method: DELETE
Path: /messages/{id}

### Delete all messages

Delete all the messages of the list and returns the updated empty list.

Method: DELETE
Path: /messages

### List all messages

Get an array containing all the messages

Method: GET
Path: /messages

### Add a message

Add a new message at the end of the message list with an ungiven id

Method: POST
Path : /messages

For more informations, check the msglist [getsandbox API](https://getsandbox.com/p/1/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzLWI3N2UzNGI5LTVlZDctNDIzYS1iNzJhLWU5OWFlNDA3ZTk1OCJ9.4vh2iPmtQjQ1mVpnPgCtVRqAnt44N4xIYZrRL1-eV04)

## Run a development local server

Launch the NextJS server in development mode :

```bash
npx next dev
# or
npm run dev
```

## Create a deployable production server

Build a production version of the web application :

```bash
npx next build
# or
npm run build
```

Run a production server

```bash
npx next start
# or
npm run start
```

## Todo List

A list of the next features that can be implemented.

-   e2e tests
-   static html export with next
-   preload message-create page
