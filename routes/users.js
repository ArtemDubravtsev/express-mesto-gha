const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getMeUser,
  getUserById,
  editUserData,
  editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMeUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editUserData,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().min(2),
    }),
  }),
  editUserAvatar,
);

module.exports = router;
