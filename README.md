## Building

### web

To create a production version of your app for web:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

### android/ios

build the app with the for using svelte-kit SPA mode (adapter-static) [docs](https://kit.svelte.dev/docs/single-page-apps)

```bash
npm run build:capacitor
```

use capacitor to transform build file into native android/ios

```bash
npx cap sync
```

### capacitor docs

- [android](https://capacitorjs.com/docs/android)
- [ios](https://capacitorjs.com/docs/ios)
