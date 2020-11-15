const { Op } = require('sequelize');
const { Transaction, Ruleset } = require('../models');

module.exports = {
  async getAllCashbacks(req, res) {
    const transactions = await Transaction.findAll({
      order: [['createdAt', 'DESC']],
    });

    const rulesets = await Ruleset.findAll({
      where: {
        startDate: { [Op.not]: null },
        endDate: { [Op.not]: null },
        cashback_amount: { [Op.not]: 0 },
        redemptionLimit: { [Op.not]: 0 },
      },
      order: [['createdAt', 'DESC']],
    });

    const usedRules = [];
    const cashbacks = [];
    transactions.forEach((transaction) => {
      let amount = 0;
      rulesets.forEach((rule) => {
        if (rule.usedRedemptionLimit < rule.redemptionLimit) {
          if (
            new Date(transaction.date) >= new Date(rule.startDate)
            && new Date(transaction.date) <= new Date(rule.endDate)
            && amount < rule.cashback_amount
          ) {
            amount = rule.cashback_amount;
            // eslint-disable-next-line no-param-reassign
            rule.usedRedemptionLimit += 1;
            let found = false;
            for (let i = 0; i < usedRules.length; i++) {
              if (usedRules[i].id === rule.id) {
                found = true;
                usedRules[i].usedRedemptionLimit = rule.usedRedemptionLimit;
                break;
              }
            }

            if (!found) {
              usedRules.push({ id: rule.id, usedRedemptionLimit: rule.usedRedemptionLimit });
            }
          }
        }
      });

      if (amount) {
        cashbacks.push({
          transactionId: transaction.id,
          cashback: amount,
        });
      }
    });

    for (let i = 0; i < usedRules.length; i++) {
      Ruleset.findByPk(usedRules[i].id).then((ruleRow) => {
        ruleRow.update({
          usedRedemptionLimit: usedRules[i].usedRedemptionLimit,
        });
      });
    }

    return res.status(200).send(cashbacks);
  },
};
