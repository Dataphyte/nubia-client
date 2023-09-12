import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '../server';

const UserSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  firstname: String,
  lastname: String,

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [
      (email: string) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
      },
      'Please fill a valid email address',
    ],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },

  image: String,
  emailVerified: { type: Boolean, required: true, deafault: false },
  accountType: { type: String, default: 'individual', required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'projects', unique: true }],

  organization: {
    org_name: String,
    position: String,
    org_size: Number,
    org_niche: String,
  },
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
