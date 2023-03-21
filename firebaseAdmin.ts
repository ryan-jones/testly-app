import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      type: process.env.NEXT_PUBLIC_FIREBASE_TYPE,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PKEY_ID,
      private_key: process.env.NEXT_PUBLIC_FIREBASE_PKEY,
      client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
      auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
      token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_CERT_URL,
      client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CERT_URL,
    } as ServiceAccount),
  });
}

export default firebaseAdmin;
