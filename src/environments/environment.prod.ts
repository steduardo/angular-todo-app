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
  apiUrl: 'https://todo.e-ds.net'
};
