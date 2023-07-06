## Development

From your terminal:

```sh
npm run dev:frontend
```

This starts your frontend app in development mode, rebuilding assets on file changes.

```sh
npm run dev:backend
```

This starts your backend app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

