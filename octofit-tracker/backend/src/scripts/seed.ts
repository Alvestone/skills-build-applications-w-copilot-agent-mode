import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

const users = [
  { _id: new Types.ObjectId('670000000000000000000001'), name: 'Alex Morgan', email: 'alex.morgan@example.com', username: 'alexm' },
  { _id: new Types.ObjectId('670000000000000000000002'), name: 'Jordan Lee', email: 'jordan.lee@example.com', username: 'jlee' },
  { _id: new Types.ObjectId('670000000000000000000003'), name: 'Sam Rivera', email: 'sam.rivera@example.com', username: 'samrivera' },
  { _id: new Types.ObjectId('670000000000000000000004'), name: 'Taylor Kim', email: 'taylor.kim@example.com', username: 'taylork' },
];

const teams = [
  {
    _id: new Types.ObjectId('670000000000000000000101'),
    name: 'Trailblazers',
    description: 'Weekend hikers and outdoor runners.',
    members: [users[0]._id, users[1]._id],
  },
  {
    _id: new Types.ObjectId('670000000000000000000102'),
    name: 'Pace Makers',
    description: 'A friendly team focused on consistent training.',
    members: [users[2]._id, users[3]._id],
  },
];

const activities = [
  { _id: new Types.ObjectId('670000000000000000000201'), user: users[0]._id, type: 'Running', duration: 32, calories: 310, date: new Date('2026-10-01T07:30:00Z') },
  { _id: new Types.ObjectId('670000000000000000000202'), user: users[0]._id, type: 'Cycling', duration: 45, calories: 420, date: new Date('2026-10-03T08:00:00Z') },
  { _id: new Types.ObjectId('670000000000000000000203'), user: users[1]._id, type: 'Strength training', duration: 40, calories: 260, date: new Date('2026-10-01T17:00:00Z') },
  { _id: new Types.ObjectId('670000000000000000000204'), user: users[1]._id, type: 'Walking', duration: 35, calories: 150, date: new Date('2026-10-04T09:15:00Z') },
  { _id: new Types.ObjectId('670000000000000000000205'), user: users[2]._id, type: 'Running', duration: 28, calories: 275, date: new Date('2026-10-02T06:45:00Z') },
  { _id: new Types.ObjectId('670000000000000000000206'), user: users[2]._id, type: 'Yoga', duration: 30, calories: 120, date: new Date('2026-10-04T10:00:00Z') },
  { _id: new Types.ObjectId('670000000000000000000207'), user: users[3]._id, type: 'Cycling', duration: 50, calories: 465, date: new Date('2026-10-02T07:00:00Z') },
  { _id: new Types.ObjectId('670000000000000000000208'), user: users[3]._id, type: 'Strength training', duration: 35, calories: 230, date: new Date('2026-10-05T16:30:00Z') },
];

const leaderboard = [
  { _id: new Types.ObjectId('670000000000000000000301'), user: users[0]._id, team: teams[0]._id, points: 820 },
  { _id: new Types.ObjectId('670000000000000000000302'), user: users[1]._id, team: teams[0]._id, points: 710 },
  { _id: new Types.ObjectId('670000000000000000000303'), user: users[2]._id, team: teams[1]._id, points: 765 },
  { _id: new Types.ObjectId('670000000000000000000304'), user: users[3]._id, team: teams[1]._id, points: 890 },
];

const workouts = [
  { _id: new Types.ObjectId('670000000000000000000401'), title: 'Easy 5K Builder', description: 'A steady run with a gentle warm-up and cool-down.', difficulty: 'beginner', duration: 30 },
  { _id: new Types.ObjectId('670000000000000000000402'), title: 'Full-body Strength', description: 'A balanced bodyweight strength circuit.', difficulty: 'intermediate', duration: 40 },
  { _id: new Types.ObjectId('670000000000000000000403'), title: 'Recovery Yoga', description: 'Mobility and restorative poses for recovery days.', difficulty: 'beginner', duration: 25 },
  { _id: new Types.ObjectId('670000000000000000000404'), title: 'Hill Interval Ride', description: 'Build cycling power with controlled hill efforts.', difficulty: 'advanced', duration: 50 },
  { _id: new Types.ObjectId('670000000000000000000405'), title: 'Brisk Walking Intervals', description: 'Alternate brisk and comfortable walking intervals.', difficulty: 'beginner', duration: 35 },
];

async function upsertRecords(
  model: typeof User,
  records: Array<Record<string, unknown> & { _id: Types.ObjectId }>,
): Promise<void> {
  for (const record of records) {
    const { _id, ...fields } = record;
    await model.updateOne(
      { _id },
      { $set: fields },
      { upsert: true, runValidators: true },
    ).exec();
  }
}

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    await upsertRecords(User, users);
    await upsertRecords(Team, teams);
    await upsertRecords(Activity, activities);
    await upsertRecords(Leaderboard, leaderboard);
    await upsertRecords(Workout, workouts);

    console.log(
      `Database seeding complete: ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, ${workouts.length} workouts.`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
