const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  Card.findById(id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      const cardOwner = card.owner.toString();
      if (cardOwner !== userId) {
        throw new ForbiddenError('Невозможно удалить чужую карточку');
      } else {
        Card.deleteOne(card)
          .then((card) => {
            res.send(card);
          });
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send(card)
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send(card)
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};