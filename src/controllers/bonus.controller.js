const sequelize = require('../config/db.config');
const User = require('../models/user.model'); 
const Bonus = require('../models/bonus.model'); 

exports.createBonus = async (req, res) => {
  const { code, amount ,used} = req.body;

  try {
    await sequelize.query(
      'INSERT INTO bonuses (code, amount, used) VALUES (:code, :amount ,:used)',
      {
        replacements: { code, amount,used },
        type: sequelize.QueryTypes.INSERT
      }
    );
    res.status(201).json({ message: 'Bonus code created successfully' });
  } catch (error) {
    console.error('Error creating bonus code:', error);
    res.status(500).json({ error: 'Error creating bonus code' });
  }
};



exports.addBonus = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, code } = req.body;
    if (!userId || !code) {
      return res.status(400).json({ error: 'User ID and bonus code are required' });
    }

    // Bonus kodunu tapın
    const bonus = await Bonus.findOne({
      where: { code, used: true },
      transaction
    });

    if (!bonus) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Bonus code not valid or already used' });
    }
    const user = await User.findByPk(userId, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ error: 'User not found' });
    }
    await User.update(
      { bonus: sequelize.literal(`bonus + ${bonus.amount}`) },
      { where: { id: userId }, transaction }
    );
    await bonus.update({ used: true }, { transaction });
    await transaction.commit();
    res.json({ message: 'Bonus added successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error adding bonus:', error);
    res.status(500).json({ error: 'Error adding bonus' });
  }
};
