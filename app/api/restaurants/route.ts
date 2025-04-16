import clientPromise from "@/utils/connect";

export async function GET(request: Request) {
  const client = await clientPromise;
  const findResult = client.db("burrito-db").collection("restaurants").find();
  const restaurants = await findResult.toArray();
  return Response.json(restaurants);
}
