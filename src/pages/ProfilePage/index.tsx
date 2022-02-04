import React from 'react';

import { Box } from '@material-ui/core';
import ProfileForm from 'components/ProfileForm';
import { useCreateOrUpdateMutation } from 'redux/stores/userProfile/userProfileApi';
import { useAppSelector } from 'redux/hooks';
import routes from 'routes';

// Страница редактирования профиля пользователя
const ProfilePage: React.FC = () => {
  const [createOrUpdate, { isLoading, isError, isSuccess }] = useCreateOrUpdateMutation();
  const profile = useAppSelector((store) => store.profile.userProfile) || {};
  const { firstName = '', lastName = '', username = '' } = profile;
  const initialValues = username ? { firstName, lastName, username } : undefined;

  return (
    <Box mt={5}>
      <ProfileForm
        initialValues={initialValues}
        onSubmit={createOrUpdate}
        isLoading={isLoading}
        isError={isError}
        isSussess={isSuccess}
        successRedurectUrl={routes.main()}
      />
    </Box>
  );
};

export default React.memo(ProfilePage);
