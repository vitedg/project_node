const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployeeSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    addresse: { type: String, required: true },
    salaire: { type: Number, required: true },
    dateNaissance: { type: Date, required: true },
    soldeConges: { type: Number, default: 30 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

EmployeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);
