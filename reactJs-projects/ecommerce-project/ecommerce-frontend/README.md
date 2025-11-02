If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

-To use api multiple times we use vite.config.ts in that we create server object and in that we add proxy object with our api end point like '/api' so wherver we use /api in axios it will use this proxy. Here proxy works as middleme between frontend and backend. we add proxy in server object so it works.

-This works like server.proxy and tell vite like hey vite whenever we see /api we do not have to find it in our server we just have to request to other computer
