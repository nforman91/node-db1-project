const Accounts = require('../accounts/accounts-model');
const yup = require('yup');

const accountSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('name of account must be a string')
    .required('name and budget are required')
    .trim()
    .min(3, 'name of account must be between 3 and 100')
    .max(100, 'name of account must be between 3 and 100'),
  budget: yup
    .number()
    .typeError('name of account must be a number')
    .required('name and budget are required')
    .min(0, 'budget of account is too large or too small')
    .max(1000000, 'budget of account is too large or too small')
})

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const validated = await accountSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // Q&A PERSON'S CODE
  // const { name } = req.body
  // // DO YOUR MAGIC
  // Accounts.getAll()
  //   .then(listOfAccounts => {
  //     for (let account of listOfAccounts) {
  //       if (account.name === name.trim()) {
  //         res.status(400).json({ message: "that name is taken" })
  //         return
  //       }
  //     }
  //     next()
  //   })

  // GABE'S CODE
  try {
    const existing = await db('accounts')
      .where('name', req.body.name.trim())
      .first()

    if (existing) {
      next({ status: 400, message: 'this name is taken' })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then(accountId => {
      if (!accountId) {
        res.status(404).json({ message: "account not found" })
      } else {
        next()
      }
    })
}
