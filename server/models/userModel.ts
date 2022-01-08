// import * as mongoose from 'mongoose';

// interface User {
//   name: string;
//   email: string;
//   avatar: string;
//   password: string;
//   passwordConfirm: string;
// }

// const userSchema = new mongoose.Schema<User>({
//   name: {
//     type: String,
//     required: [true, 'please tell us your name!'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Please provide your email!'],
//     unique: true,
//     lowercase: true,
//   },
//   avatar: String,
//   password: {
//     type: String,
//     required: [true, 'Please provide a min 8 character password!'],
//     minLength: 8,
//   },
//   passwordConfirm: {
//     type: String,
//     required: [true, 'Please provide a matching password!'],
//     minLength: 8,
//   },
// });

// export const User = mongoose.model<User>('User', userSchema);
