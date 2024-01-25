import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { id, currentPassword, newPassword } = await req.json();
    const user = await User.findOne({
      _id: id,
    });
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return Response.json(
        { statusText: 'Mật khẩu hiện tại không đúng' },
        { status: 400 }
      );
    }
    const newPasswordMatch = await bcrypt.compare(newPassword, user.password);
    if (newPasswordMatch) {
      return Response.json(
        { statusText: 'Mật khẩu mới không được trùng với mật khẩu cũ' },
        { status: 400 }
      );
    }

    if (passwordMatch && !newPasswordMatch) {
      return Response.json(
        { statusText: 'mat khau moi hop le' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log('error:', error);
  }
}
