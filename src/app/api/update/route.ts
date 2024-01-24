import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

export async function PUT(req: Request) {
  try {
    const { id, email } = await req.json();
    await connectMongoDB();
    await User.findByIdAndUpdate({ _id: id }, { email });
    return Response.json({ message: 'Update successfully' }, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Error' }, { status: 500 });
  }
}
