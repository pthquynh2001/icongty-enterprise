import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { email, username } = await req.json();
    const user = await User.findOne({ $or: [{ email }, { username }] }).select(
      '_id'
    );
    console.log('user:', user);
    return Response.json({ user });
  } catch (error) {
    console.log('error:', error);
  }
}
