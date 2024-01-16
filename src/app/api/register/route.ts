import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    return Response.json({ message: 'User registered' }, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Error' }, { status: 500 });
  }
}
