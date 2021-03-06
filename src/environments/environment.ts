// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  amplify: {
    Auth: {
      // identityPoolId: 'eu-west-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_cx77Drk1j',
      userPoolWebClientId: '2q7b6hmq1lp6uvmh95p5ksitp'
    }
  },
  apiGateway: {
    invokeURL: 'https://i0jhvvbewe.execute-api.eu-west-1.amazonaws.com/dev'
  },
  apiUrl: 'http://localhost:3000'
};
