import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Por favor providencie um username único"],
        unique: [true, "Usuário já existe"]
    },
    password: {
        type: String,
        required: [true, "Por favor providencie uma senha"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Por favor providencie um email único"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);