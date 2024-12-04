const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    typeConge: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    validate: { type: Boolean, default: false },
    statut: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    soldeRestant: { type: Number , default: 30},
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }
});

module.exports = mongoose.model('Leave', LeaveSchema);
