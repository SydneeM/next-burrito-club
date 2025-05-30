import clientPromise from "@/utils/connect";
import { ObjectId } from "mongodb";

export interface Review {
  rating: number;
  comment: string;
  user: string;
}

export interface Restaurant {
  buyer: string;
  restaurant: string;
  time: number;
  ratings: number[];
  reviews: Review[];
}

export interface RestaurantDocument extends Restaurant {
  _id: string;
}

export async function GET() {
  const client = await clientPromise;
  const findResult = client.db("next_burrito_club").collection("restaurants").find();
  const restaurants = await findResult.toArray();
  restaurants.sort((a, b) => b.time - a.time);
  return Response.json(restaurants);
}

export async function POST(request: Request) {
  const newRestaurant = await request.json();
  const client = await clientPromise;
  const insertResult = await client.db("next_burrito_club").collection("restaurants").insertOne(newRestaurant);
  const newId = insertResult.insertedId;
  return Response.json({ message: `Added restaurant with id ${newId}` });
}

export async function PATCH(request: Request) {
  const { updateId, updatedReviews, updatedRatings } = await request.json();
  const client = await clientPromise;
  await client.db("next_burrito_club").collection("restaurants").updateOne({ _id: ObjectId.createFromHexString(updateId) }, { $set: { reviews: updatedReviews, ratings: updatedRatings } });
  return Response.json({ message: `Added review for restaurant with id ${updateId}` });
}
