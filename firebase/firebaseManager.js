import admin from 'firebase-admin';

function initializeFirebase() {
  const serviceAccountBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;

  if (serviceAccountBase64) {
    const serviceAccountContent = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountContent))
    });
  } else {
    throw new Error('Service account for Firebase not setup properly');
  }
}

export default initializeFirebase;