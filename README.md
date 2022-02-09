# DC ModuleFederation Demo 
## Promise Based Dynamic Remotes
## Original docs: https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes

There are two examples of staic and dynamic urls. Each example has two projects: 
- app1 is the `HOST` app
- app2 is the `REMOTE` app

app2 has dynamic remote url, due to `build-tag`. For example, it changes every minute.

## Instalation

Install packages. Then run app2 and app1.

```sh
cd app2
npm ci
npm run start

cd ../
cd app1
npm ci 
npm run start

```

You will see a web-component from `app2` inside `app1`.

## Features

All features are in `mf_remotes.js`. 
The only thing you need is to pass an array with tag name and url of remote module.
Array example you can find in `webpack.config.js`. 

```js
const remoteModules = [
  { 
    tag:'app2-tag-name', 
    url:'https://localhost:4002' 
  },
]

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: getRemoteModules(remoteModules)
    }),
    ...
  ]
}
```

