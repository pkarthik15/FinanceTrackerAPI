const express = require('express')

const account = require('../controllers/accountController')
const requireAuth = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(requireAuth)

router.get('/', account.getUserAccounts)
router.post('/', account.createUserAccount)
router.patch('/:id', account.updateUserAcount)
router.delete('/:id', account.deleteUserAccount)


module.exports = router