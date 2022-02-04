import React from 'react';

import { Box } from '@material-ui/core';
import LoginForm from 'components/LoginForm';
import { useCreateUserMutation } from 'redux/stores/user/userApi';

// Страница регистрации
const SignUpPage: React.FC = () => {
  const [login, { isLoading, isError }] = useCreateUserMutation();

  return (
    <Box mt={5}>
      <LoginForm isSignUp onSubmit={login} isLoading={isLoading} isError={isError} />
    </Box>
  );
};

export default React.memo(SignUpPage);
