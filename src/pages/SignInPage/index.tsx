import React from 'react';

import { Box } from '@material-ui/core';
import LoginForm from 'components/LoginForm';
import { useLazyLoginQuery } from 'redux/stores/auth/authApi';

// Страница авторизации
const SignInPage: React.FC = () => {
  const [login, { isLoading, isError }] = useLazyLoginQuery();

  return (
    <Box mt={5}>
      <LoginForm isSignUp={false} onSubmit={login} isLoading={isLoading} isError={isError} />
    </Box>
  );
};

export default React.memo(SignInPage);
