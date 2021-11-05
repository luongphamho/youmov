import React from 'react';

import { AuthenticatedUserProvider } from '../components/context/AuthenticatedUserProvider';
import RootNavigator from './RootNavigator';

/**
 * Wrap all providers here
 */

export default function Routes() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}