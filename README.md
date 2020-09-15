# Message List

This application is a simple [ReactMD](https://github.com/mlaursen/react-md), [Next.js](https://nextjs.org/), and Typescript
app featuring:

- [\_variables.scss](./styles/_variables.scss) to override the default
  `react-md` theme and feature toggles
- [app.scss](./styles/app.scss) global styles that conditionally apply the dark theme
  based on the user's OS preferences
- a custom [\_app.tsx](./pages/_app.tsx) that uses a persistent layout
- a reusable [Layout.tsx](./components/Layout/Layout.tsx) that:
  - updates all the icons to use `SVGIcon`s instead of `FontIcon`s
  - initializes the `Layout` component from `react-md` with navigation items

For more information about ReactMD's features, styling, components, and API, check out
the [main documentation](https://react-md.dev). You can also view the
[documentation site's source code](https://github.com/mlaursen/react-md/tree/master/packages/documentation)
for a more complex example of using ReactMD + Next.js.

## Run a development local server

Launch the NextJS server in dev mode :

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
