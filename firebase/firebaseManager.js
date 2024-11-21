import admin from 'firebase-admin';
import logger from '../utils/logger.js';

function initializeFirebase() {
  const serviceAccountBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;

  if (serviceAccountBase64) {
    const serviceAccountContent = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountContent))
    });
    logger.info('Firebase initialized');
  } else {
    throw new Error('Service account for Firebase not setup properly');
  }
}

export default initializeFirebase;