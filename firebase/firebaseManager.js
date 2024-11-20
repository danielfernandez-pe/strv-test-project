import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

function initializeFirebase() {
  const serviceAccountPath = path.resolve('service-account-file.json');  
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default initializeFirebase;