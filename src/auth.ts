import { Auth } from '@langchain/langgraph-sdk/auth';

export const auth = (new Auth()).authenticate(async function () {
  return {
    is_authenticated: true,
    identity: 'user',
    permissions: []
  };
}).on('*:create_run', async ({ value }) => {
  value.metadata = {
    ...value.metadata,
    custom: 'metadata',
  }
  value.kwargs.context = {
    ...value.kwargs.context as object,
    custom: 'context',
  }

  return true;
})
