const router = require('express').Router()
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique
} = require('./accounts-middleware')
const Accounts = require('./accounts-model')

router.get('/', (req, res, next) => {
  Accounts.getAll(req.query)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  Accounts.getById(id)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(next)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(account => {
      res.status(201).json(account)
    })
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
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
  Accounts.deleteById(req.params.id)
    .then(() => {
      res.status(200).json(req.account)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    prodMessage: 'something went wrong',
    message: err.message
  })
})

module.exports = router;
