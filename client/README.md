This is a starter template to setup React with ViteJS in VS Code.
YouTube video: https://www.youtube.com/watch?v=p0akKP9UasQ

One thing I did not cover in the video is the `eslint-plugin-react-hooks` package, which enforces the rules of Hooks, (https://react.dev/warnings/invalid-hook-call-warning). This package is implemented in the `eslintrc.json` file, in the "extends" array, as `"plugin:react-hooks/recommended"`. You can read more about it here: https://www.npmjs.com/package/eslint-plugin-react-hooks.

I have removed the caret `^` in front of each NPM package so that you will install all known working packages.

For `DevDependencies` run: `npm i -D vite@4.4.9 @vitejs/plugin-react@4.0.4 eslint@8.48.0 eslint-config-prettier@9.0.0 eslint-plugin-import@2.28.1 eslint-plugin-jsx-a11y@6.7.1 eslint-plugin-react@7.33.2 prettier@3.0.3 eslint-plugin-prettier@5.0.0`.

For production `Dependencies` run: `npm i react@18.2.0 react-dom@18.2.0`.

Or you could just run `npm i` with the provided `package.json` file.

I have also provided a VS Code `VSCODE_Settings_Example.json` file for your convinience, you can cherry pick whatever rule/rules that works for you.
