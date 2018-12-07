export const environment = {
  production: true,
  amplify: {
    Auth: {
      identityPoolId: 'eu-west-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_xxxxxxxxx',
      userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  },
  apiUrl: 'http://localhost:3000'
};
