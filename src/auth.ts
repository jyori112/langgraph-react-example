import { Auth } from '@langchain/langgraph-sdk/auth';

export const auth = (new Auth()).authenticate(async function () {
  return {
    is_authenticated: true,
    identity: 'user',
    permissions: []
  };
}).on('*:create_run', async ({ value }) => {
  console.log('Intercepted create_run event in auth middleware with value:', value);

  value.metadata = {
    ...value.metadata,
    auth: 'metadata',
  }
  value.kwargs.context = {
    ...value.kwargs.context as object,
    auth: 'context',
  }

  return true;
})
