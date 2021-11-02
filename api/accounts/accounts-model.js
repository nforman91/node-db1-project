const db = require('../../data/db-config.js');

const getAll = () => {
  // IN CLASS:
  // const result = await db('accounts')
  // return result

  // SOLUTION VIDEO:
  return db('accounts');
}

const getById = id => {
  // IN CLASS:
  // const result = await db('accounts').where('id', id)
  // return result

  // SOLUTION VIDEO:
  return db('accounts').where('id', id).first();
}

const create = async account => {
  // IN CLASS:
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return newAccount

  // SOLUTION VIDEO:
  // const [id] = await db('accounts').insert(account);
  // return getById(account);
}

const updateById = async (id, account) => {
  // IN CLASS:
  // await db('accounts').update(account).where('id', id)
  // return getById(id)

  // SOLUTION VIDEO:
  await db('accounts').where('id', id).update(account);
  return getById(id)
}

const deleteById = id => {
  // IN CLASS:
  // const result = await db('accounts').del().where('id', id)
  // return result

  // SOLUTION VIDEO:
  return db('accounts').where('id', id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
