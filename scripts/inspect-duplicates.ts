import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appletConfig from '../firebase-applet-config.json';

const app = initializeApp({
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
});

const db = getFirestore(app, appletConfig.firestoreDatabaseId);

async function main() {
  console.log('--- PRODUCTS IN FIRESTORE ---');
  const prodSnap = await getDocs(collection(db, 'products'));
  console.log(`Total Product Documents: ${prodSnap.size}`);
  const prodMap = new Map<string, any[]>();
  prodSnap.docs.forEach((doc) => {
    const data = doc.data();
    console.log(`ID: ${doc.id} | name: "${data.name}" | displayOrder: ${data.displayOrder}`);
    const key = (data.name || '').trim().toLowerCase();
    if (!prodMap.has(key)) prodMap.set(key, []);
    prodMap.get(key)!.push({ id: doc.id, ...data });
  });

  console.log('\n--- PRODUCT DUPLICATE ANALYSIS ---');
  let prodDupCount = 0;
  for (const [name, docs] of prodMap.entries()) {
    if (docs.length > 1) {
      prodDupCount += (docs.length - 1);
      console.log(`Duplicate found for product name: "${name}" (${docs.length} docs):`);
      docs.forEach((d) => console.log(`   - ID: ${d.id}, order: ${d.displayOrder}`));
    }
  }
  if (prodDupCount === 0) console.log('No duplicate products found by name.');

  console.log('\n--- SERVICES IN FIRESTORE ---');
  const srvSnap = await getDocs(collection(db, 'services'));
  console.log(`Total Service Documents: ${srvSnap.size}`);
  const srvMap = new Map<string, any[]>();
  srvSnap.docs.forEach((doc) => {
    const data = doc.data();
    console.log(`ID: ${doc.id} | title: "${data.title}" | number: "${data.number}" | displayOrder: ${data.displayOrder}`);
    const key = (data.title || '').trim().toLowerCase();
    if (!srvMap.has(key)) srvMap.set(key, []);
    srvMap.get(key)!.push({ id: doc.id, ...data });
  });

  console.log('\n--- SERVICE DUPLICATE ANALYSIS ---');
  let srvDupCount = 0;
  for (const [title, docs] of srvMap.entries()) {
    if (docs.length > 1) {
      srvDupCount += (docs.length - 1);
      console.log(`Duplicate found for service title: "${title}" (${docs.length} docs):`);
      docs.forEach((d) => console.log(`   - ID: ${d.id}, number: ${d.number}, order: ${d.displayOrder}`));
    }
  }
  if (srvDupCount === 0) console.log('No duplicate services found by title.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
