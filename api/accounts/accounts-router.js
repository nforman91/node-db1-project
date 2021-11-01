const router = require('express').Router()
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique
} = require('./accounts-middleware')
const Accounts = require('./accounts-model')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll(req.query)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
    .then(account => {
      res.status(201).json(account)
    })
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
    .then(() => {
      return Accounts.getById(req.params.id)
    })
    .then(account => {
      res.status(200).json(account)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then(() => {
      res.status(200).json(req.account)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    prodMessage: 'something went wrong',
    message: err.message
  })
})

module.exports = router;
