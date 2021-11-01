const db = require('../../data/db-config.js');

const getAll = () => {
  // DO YOUR MAGIC
  const result = await db('accounts')
  return result
}

const getById = id => {
  // DO YOUR MAGIC
  const result = await db('accounts').where('id', id)
  return result
}

const create = account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return newAccount
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').update(account).where('id', id)
  return getById(id)
}

const deleteById = id => {
  // DO YOUR MAGIC
  const result = await db('accounts').del().where('id', id)
  return result
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
