import mongoose, { Schema } from 'mongoose';

type OctofitRecord = Record<string, unknown>;

const userSchema = new Schema<OctofitRecord>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    username: { type: String, trim: true, unique: true, sparse: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<OctofitRecord>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<OctofitRecord>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    calories: { type: Number, min: 0 },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema<OctofitRecord>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<OctofitRecord>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    duration: { type: Number, min: 0 },
  },
  { timestamps: true },
);

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
export const Team = mongoose.models.Team ?? mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);
export const Leaderboard =
  mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
