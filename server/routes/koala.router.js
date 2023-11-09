const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION

const pool = require('../modules/pool')

// GET
koalaRouter.get('/', (req,res) => {
    // console.log("Getting Data from server.")
    let text = `
    SELECT * FROM "koalas"
    ORDER BY "id";`
    pool.query(text)
    .then((dbResult) => {
      // console.log(dbResult)
      res.send(dbResult.rows)
    }).catch((dbError)=>{
      res.sendStatus(500)
    })
})


// POST
koalaRouter.post('/', (req, res) => {
  // console.log("Posting a new list member!")
  let text = `
  INSERT INTO "koalas"
    ("name", "gender", "age", "ready_to_transfer", "notes")
  VALUES
    ($1,$2,$3,$4,$5)
  `

  console.log(req.body.readyToTransfer)
  let sqlValues = [req.body.name, req.body.gender,
    Number(req.body.age),req.body.readyToTransfer,
    req.body.notes]
  console.log(sqlValues)
  pool.query(text, sqlValues)
  .then((dbResult) => {
    // console.log(dbResult)
    res.send(dbResult.rows)
  }).catch((dbError)=>{
    res.sendStatus(500)
  })
})

// PUT
koalaRouter.put('/:id', (req, res) =>{
  // console.log("Trying to update koalas!")
  let isReady = `
  SELECT * FROM "koalas"
  WHERE "id" = $1`  

  let transferReady = 'TRUE'
  const sqlValues = [req.params.id]
  pool.query(isReady, sqlValues).then((dbResult) =>{
    // console.log("Data returned:", dbResult.rows[0].ready_to_transfer)
    if (dbResult.rows[0].ready_to_transfer === true) {
      transferReady = 'FALSE'
      // console.log("Change to False!")
    }
    let text = `
    UPDATE "koalas"
      SET "ready_to_transfer" = ${transferReady}
      WHERE "id" = $1;`

    // console.log(text)
    pool.query(text, sqlValues)
    .then((dbResult) =>{
      res.sendStatus(201)
    }).catch((dbError) => {
      res.sendStatus(500)
    })
  }).catch((dbError) =>{
    res.sendStatus(500)
  })
})


// DELETE

koalaRouter.delete('/:id', (req, res) => {
  let text = `
  DELETE FROM "koalas"
    WHERE "id" = $1`
  const sqlValues = [req.params.id]
  pool.query(text,sqlValues)
  .then((dbResult) => {
    res.sendStatus(201)
  }).catch((dbError) => {
    res.sendStatus(500)
  })
})

module.exports = koalaRouter;