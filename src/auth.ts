import { Auth } from '@langchain/langgraph-sdk/auth';

export const auth = (new Auth()).authenticate(async function () {
  return {
    is_authenticated: true,
    identity: 'user',
    permissions: []
  };
}).on('*:create_run', async ({ value }) => {
  console.log('Intercepted create_run event in auth middleware with input:', value.kwargs.input);
  const input = value.kwargs.input;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((input as any)?.userId !== 'secret_user_id') {
    throw new Error('Unauthorized: Invalid userId');
  }

  return true;
})
