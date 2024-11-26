import mongoose from 'mongoose';

const GameStatsSchema = new mongoose.Schema({
  playerXWins: {
    type: Number,
    default: 0,
  },
  playerOWins: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const GameStats = mongoose.model('GameStats', GameStatsSchema);

export default GameStats;