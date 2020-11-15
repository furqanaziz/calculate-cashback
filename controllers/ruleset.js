const { Ruleset } = require('../models');

module.exports = {
  getAll(req, res) {
    return Ruleset.findAll({
      order: [['createdAt', 'DESC']],
    })
      .then((rulesets) => res.status(200).send(rulesets))
      .catch((error) => res.status(400).send(error));
  },

  showOne(req, res) {
    return Ruleset.findByPk(req.params.id)
      .then((ruleset) => {
        if (!ruleset) {
          return res.status(404).send({
            message: 'Ruleset Not Found',
          });
        }
        return res.status(200).send(ruleset);
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send(error);
      });
  },

  create(req, res) {
    return Ruleset.create({
      startDate: req.body.startDate || null,
      endDate: req.body.endDate || null,
      cashback_amount: req.body.cashback_amount || 0.0,
      redemptionLimit: req.body.redemptionLimit || 0,
      minTransactions: req.body.minTransactions || 0,
      budget: req.body.budget || 0.0,
    })
      .then((ruleset) => res.status(201).send(ruleset))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Ruleset.findByPk(req.params.id)
      .then((ruleset) => {
        if (!ruleset) {
          return res.status(404).send({
            message: 'Ruleset Not Found',
          });
        }
        return ruleset
          .update({
            startDate: req.body.startDate || ruleset.startDate,
            endDate: req.body.endDate || ruleset.endDate,
            cashback_amount: req.body.cashback_amount || ruleset.cashback_amount,
            redemptionLimit: req.body.redemptionLimit || ruleset.redemptionLimit,
          })
          .then(() => res.status(200).send(ruleset))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Ruleset.findByPk(req.params.id)
      .then((ruleset) => {
        if (!ruleset) {
          return res.status(404).send({
            message: 'Ruleset Not Found',
          });
        }
        return ruleset
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
