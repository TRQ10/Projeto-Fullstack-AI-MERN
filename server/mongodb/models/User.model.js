import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, "Porfavor providencie um username unico"] ,
    unique: [true, "Usuario já existe"] 
},
  password: { 
    type: String, 
    required: [true, "Porfavor providencie uma senha"],
    unique: false,
},
  email: { 
    type: String, 
    required: [true, "Porfavor providencie um email"],
    unique: true,
},
  firstName: { type: String},
  lastName: { type: String},
  mobile: { type: Number},
  address: { type: String},
  profile: { type: String},
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);