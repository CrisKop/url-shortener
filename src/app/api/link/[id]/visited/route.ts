// app/api/link/[id]/visited/route.ts
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const collection = await getCollection<Link>("links");

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { timesVisited: 1 }, $set: { updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    if (!result) {
      return Response.json({ error: "No encontrado" }, { status: 404 });
    }

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Error al actualizar visitas" },
      { status: 500 }
    );
  }
}
