import { Router } from 'express';

import { GlobalMiddleware } from '../middleware/CheckError';
import { ContactController } from '../controllers/ContactController';
import { ContactValidator } from '../validator/ContactValidator';

export class ContactRouter{

    public router: Router;

    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
        this.router.get(
            '/', 
            GlobalMiddleware.checkError, 
            ContactController.getContacts
        )
        this.router.get(
            '/:id', 
            ContactValidator.getContactById(),
            GlobalMiddleware.checkError, 
            ContactController.getContacts
        )
    }

    postRoutes(){   
        this.router.post(
            '/',
            ContactValidator.postContacts(),
            GlobalMiddleware.checkError, 
            ContactController.postContacts
        );
    }

    patchRoutes(){

    }

    putRoutes(){
        this.router.put(
            '/:id',
            ContactValidator.getContactById(),
            GlobalMiddleware.checkError,
            ContactController.updateContact
        )
    }

    deleteRoutes(){
        this.router.delete(
            '/:id',
            ContactValidator.getContactById(),
            GlobalMiddleware.checkError,
            ContactController.deleteContact
        )
    }

}

export default new ContactRouter().router;

