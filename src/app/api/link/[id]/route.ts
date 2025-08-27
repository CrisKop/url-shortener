import { getCollection } from "@/lib/mongodb";
import { ObjectId, Filter } from "mongodb";

// #MARK: GET one link
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // 👈 importante, Promise
) {
  try {
    const { id } = await context.params; // 👈 aquí lo resolvemos
    const collection = await getCollection<Link>("links");

    const query: Filter<Link> = { $or: [] };

    if (ObjectId.isValid(id)) {
      query.$or!.push({ _id: new ObjectId(id) });
    }

    query.$or!.push({ shortened: id });

    const link = await collection.findOne(query);

    if (!link)
      return Response.json({ error: "No encontrado" }, { status: 404 });
    return Response.json(link, { status: 200 });
  } catch (_error) {
    console.log(_error);
    return Response.json({ error: "Error al obtener link" }, { status: 500 });
  }
}

// #MARK: PUT update link
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅
    const collection = await getCollection<Link>("links");
    const body = await req.json();
    const now = new Date();

    const updateFields = { ...body, updatedAt: now };

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!result)
      return Response.json({ error: "No encontrado" }, { status: 404 });

    return Response.json(result, { status: 200 });
  } catch (_error) {
    return Response.json(
      { error: "Error al actualizar link" },
      { status: 500 }
    );
  }
}

// #MARK: DELETE link
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅
    const collection = await getCollection<Link>("links");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ error: "No encontrado" }, { status: 404 });
    }

    return Response.json(
      { message: "Eliminado correctamente" },
      { status: 200 }
    );
  } catch (_error) {
    return Response.json({ error: "Error al eliminar link" }, { status: 500 });
  }
}
