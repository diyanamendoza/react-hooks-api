const { Router } = require('express')
const Hook = require('../models/Hook')

module.exports = Router()
  // .post('/', async (req, res) => {
  //   const hook = await Hook.insert({
  //     title: req.body.title,
  //     explanation: req.body.explanation,
  //     source: req.body.source,
  //   })
  //   res.send(hook)
  // })

  .get('/:id', async (req, res) => {
    const { id } = req.params
    const hook = await Hook.getById(id)
    res.send(hook)
  })

  .get('/', async (req, res) => {
    const hooks = await Hook.getAll()
    res.send(hooks)
  })

// .patch('/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const existingHook = await Hook.getById(id)
//     if (!existingHook) {
//       const error = new Error(`Hook ${id} not found.`)
//       error.status = 404
//       throw error
//     }

//     const title = req.body.title ?? existingHook.title
//     const explanation = req.body.explanation ?? existingHook.explanation
//     const source = req.body.source ?? existingHook.source

//     const hook = await Hook.updateById(id, { title, explanation, source })

//     res.send(hook)
//   } catch (error) {
//     next(error)
//   }
// })

// .delete('/:id', async (req, res) => {
//   const { id } = req.params
//   const hook = await Hook.deleteById(id)
//   res.send(hook)
// })
