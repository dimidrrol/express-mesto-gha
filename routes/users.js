const router = require('express').Router();
const { getUsers, getUser, patchUser, patchUserAvatar, getLoginUser } = require('../controllers/users');
const { validateAvatar, validateProfile, validateId } = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getLoginUser);
router.get('/:id', validateId, getUser);
router.patch('/me', validateProfile, patchUser);
router.patch('/me/avatar', validateAvatar, patchUserAvatar);

module.exports = router;