const { Transaction, Customer } = require('../models');

module.exports = {
  getAll(req, res) {
    return Transaction.findAll({
      include: {
        model: Customer,
        as: 'customer',
      },
      order: [['createdAt', 'DESC']],
    })
      .then((transactions) => res.status(200).send(transactions))
      .catch((error) => res.status(400).send(error));
  },

  showOne(req, res) {
    return Transaction.findByPk(req.params.id, {
      include: {
        model: Customer,
        as: 'customer',
      },
    })
      .then((transaction) => {
        if (!transaction) {
          return res.status(404).send({
            message: 'Transaction Not Found',
          });
        }
        return res.status(200).send(transaction);
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send(error);
      });
  },

  create(req, res) {
    return Customer.findByPk(req.body.customerId)
      .then((customer) => {
        if (!customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return Transaction.create({
          date: req.body.date,
          customerId: req.body.customerId,
        })
          .then((transaction) => res.status(201).send(transaction))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(404).send(error));
  },

  update(req, res) {
    return Transaction.findByPk(req.params.id)
      .then((transaction) => {
        if (!transaction) {
          return res.status(404).send({
            message: 'Transaction Not Found',
          });
        }
        if (req.body.customerId) {
          Customer.findByPk(req.body.customerId)
            .then((customer) => {
              if (!customer) {
                res.status(404).send({
                  message: 'Customer Not Found',
                });
              }
            })
            .catch((error) => res.status(404).send(error));
        }
        return transaction
          .update({
            date: req.body.date || transaction.date,
            customerId: req.body.customerId || transaction.customerId,
          })
          .then(() => res.status(200).send(transaction))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Transaction.findByPk(req.params.id)
      .then((transaction) => {
        if (!transaction) {
          return res.status(404).send({
            message: 'Transaction Not Found',
          });
        }
        return transaction
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
