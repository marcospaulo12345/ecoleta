import express, { request, response } from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfige from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfige);

const poinsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/item', itemsController.index);

routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body:Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    poinsController.create
);

routes.get('/points', poinsController.index);

routes.get('/points/:id', poinsController.show);

export default routes;