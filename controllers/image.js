
const handleImage = (req, res, db) => {
  db('users').where('id', '=', req.body.id) 
    .increment('entries', 1) // instead of using "UPDATE" we are using knex feature "increment" to increment our entries value by one
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
  handleImage: handleImage
}