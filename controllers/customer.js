const { Customer, Transaction } = require('../models');

module.exports = {
  getAll(req, res) {
    return Customer.findAll({
      include: [
        {
          model: Transaction,
          as: 'transactions',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Transaction, as: 'transactions' }, 'createdAt', 'DESC'],
      ],
    })
      .then((customers) => res.status(200).send(customers))
      .catch((error) => res.status(400).send(error));
  },

  showOne(req, res) {
    return Customer.findByPk(req.params.id, {
      include: [
        {
          model: Transaction,
          as: 'transactions',
        },
      ],
      order: [[{ model: Transaction, as: 'transactions' }, 'createdAt', 'DESC']],
    })
      .then((customer) => {
        if (!customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return res.status(200).send(customer);
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send(error);
      });
  },

  create(req, res) {
    return Customer.create({
      customer_name: req.body.customer_name,
    })
      .then((customer) => res.status(201).send(customer))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Customer.findByPk(req.params.id)
      .then((customer) => {
        if (!customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return customer
          .update({
            customer_name: req.body.customer_name || customer.customer_name,
          })
          .then(() => res.status(200).send(customer))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Customer.findByPk(req.params.id)
      .then((customer) => {
        if (!customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return customer
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
