import GameStats from '../models/GameStats.js';

export const getGameStats = async (req, res) => {
  try {
    const stats = await GameStats.findOne();
    res.json(stats || { playerXWins: 0, playerOWins: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateGameStats = async (req, res) => {
  const { winner } = req.body;
  try {
    let stats = await GameStats.findOne();

    if (!stats) {
      stats = new GameStats();
    }

    if (winner === 'X') {
      stats.playerXWins += 1;
    } else if (winner === 'O') {
      stats.playerOWins += 1;
    }

    await stats.save();

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};