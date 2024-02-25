import { connectMongoDB } from '@/lib/mongodb';
import User, { UserDocument } from '@/models/user';
import bcrypt from 'bcryptjs';

export async function PUT(req: Request) {
  try {
    const {
      id,
      email,
      username,
      password,
      firstName,
      lastName,
      phone,
      picture,
    } = await req.json();
    await connectMongoDB();

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updateData: Partial<UserDocument> = {
      email: email,
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      picture: picture,
    };

    if (Object.keys(updateData).length > 0) {
      await User.findByIdAndUpdate({ _id: id }, updateData);
      return Response.json(
        { statusText: 'Update successfully' },
        { status: 200 }
      );
    } else {
      return Response.json(
        { statusText: 'No data to update' },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json({ message: 'Error' }, { status: 500 });
  }
}
