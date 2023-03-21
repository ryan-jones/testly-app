import admin from './firebaseAdmin';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config): any {
      return cypressFirebasePlugin(on, config, admin, {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    },
  },
});
