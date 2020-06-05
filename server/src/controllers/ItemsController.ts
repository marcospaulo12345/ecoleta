import {Request, Response} from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response) {
        const item = await knex('item').select('*');
    
        const serializedItem = item.map(items =>{
            return {
                id: items.id,
                title: items.title,
                image_url: `http://192.168.0.101:3333/uploads/${items.image}`,
            };
        });
    
        return response.json(serializedItem);
    }
}

export default ItemsController;