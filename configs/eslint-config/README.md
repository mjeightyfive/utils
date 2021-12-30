# @mjeightyfive/eslint-config

> eslint config

## Install

### JavaScript

```sh
❯ npm i -D @mjeightyfive/eslint-config
```

then in your `.eslintrc.json` add:

```json
"extends": ["@mjeightyfive/eslint-config"]
```

### React:

```json
"extends": ["@mjeightyfive/eslint-config", "@mjeightyfive/eslint-config/react"]
```

then install React dependencies:

```sh
npm i -D eslint-config-react-app @babel/eslint-parser@^7.14.7 @typescript-eslint/eslint-plugin@^4.0.0 @typescript-eslint/parser@^4.0.0 babel-preset-react-app@^10.0.0 eslint@^7.5.0 eslint-plugin-flowtype@^5.2.0 eslint-plugin-import@^2.22.0 eslint-plugin-jsx-a11y@^6.3.1 eslint-plugin-react@^7.20.3 eslint-plugin-react-hooks@^4.0.8 eslint-plugin-testing-library@^3.9.0
```

### TypeScript:

```json
"extends": ["@mjeightyfive/eslint-config", "@mjeightyfive/eslint-config/typescript"]
```

```sh
npm i -D eslint-config-standard-with-typescript@latest typescript@latest eslint@^7.12.1 eslint-plugin-promise@^5.0.0 eslint-plugin-import@^2.22.1 eslint-plugin-node@^11.1.0 @typescript-eslint/eslint-plugin@^4.0.1
```

### JSON:

```json
"extends": ["@mjeightyfive/eslint-config", "@mjeightyfive/eslint-config/json"]
```

then install JSON plugin dependency:

```sh
npm i -D eslint-plugin-json
```

## License

MIT © [mjeightyfive](https://mje.fi)
