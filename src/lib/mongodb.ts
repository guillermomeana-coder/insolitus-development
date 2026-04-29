import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

const options = {};

let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getDatabase(): Promise<Db> {
  if (!clientPromise) {
    throw new Error('MongoDB not configured. Set MONGODB_URI environment variable.');
  }
  const client = await clientPromise;
  return client.db(process.env.DB_NAME || 'insolitus');
}

export async function checkConnection(): Promise<boolean> {
  if (!clientPromise) return false;
  try {
    const client = await clientPromise;
    await client.db().admin().ping();
    return true;
  } catch {
    return false;
  }
}

export { clientPromise };
