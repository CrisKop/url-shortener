import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

if (!uri) throw new Error("⚠️ Define MONGODB_URI en .env.local");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Tipado global para evitar `any`
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Función para conectar con timeout
async function connectWithTimeout(client: MongoClient, ms: number) {
  return new Promise<MongoClient>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("⛔ MongoDB no respondió en 5s")),
      ms
    );
    client
      .connect()
      .then((c) => {
        clearTimeout(timer);
        console.log(`✅ MongoDB conectado (${process.env.NODE_ENV || "dev"})`);
        resolve(c);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = connectWithTimeout(client, 5000);
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = connectWithTimeout(client, 5000);
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
