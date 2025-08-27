import { getCollection } from "@/lib/mongodb";

// GET all links
// #MARK: GET top 6 links
export async function GET() {
  try {
    const collection = await getCollection<Link>("links");
    // const links = await collection.find({}).toArray();
    const links = await collection
      .find({})
      .sort({ timesVisited: -1 }) // orden descendente (mayor a menor)
      .limit(6) // solo 6 documentos
      .toArray();

    return Response.json(links, { status: 200 });
  } catch (_error) {
    return Response.json(
      { error: "Error al obtener los links" },
      { status: 500 }
    );
  }
}

// #MARK: POST create a new link
export async function POST(req: Request) {
  try {
    const collection = await getCollection<Link>("links");
    const body = await req.json();

    if (!body.url) {
      return Response.json({ error: "URL es requerida" }, { status: 400 });
    }

    const now = new Date();
    const newLink: Link = {
      url: body.url,
      createdAt: now,
      updatedAt: now,
      timesVisited: 0,
      shortened: body.shortened || Math.random().toString(36).substring(2, 7),
    };

    if (body.url) {
      const existingLink = await collection.findOne({
        url: body.url,
      });
      if (existingLink) {
        return Response.json(existingLink, { status: 200 });
      }
    }

    const result = await collection.insertOne(newLink);

    return Response.json(
      { _id: result.insertedId, ...newLink },
      { status: 201 }
    );
  } catch (_error) {
    return Response.json({ error: "Error al crear link" }, { status: 500 });
  }
}
