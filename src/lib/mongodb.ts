import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

if (!uri) throw new Error("⚠️ Define MONGODB_URI en .env.local");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // cache en dev
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// 👉 helper para obtener colección
export async function getCollection<T extends Document = Document>(
  name: string
): Promise<Collection<T>> {
  const client = await clientPromise;
  const db: Db = client.db("zapcut");
  return db.collection<T>(name);
}
