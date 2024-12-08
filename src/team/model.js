import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  accessLevel: { type: String, enum: ['read', 'write', 'admin'], default: 'read' }, // Access levels for members
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who created the team
  createdAt: { type: Date, default: Date.now }
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
