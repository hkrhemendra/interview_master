import { body, param } from 'express-validator';
import { AppDataSource } from '../data-source';
import { Contact } from '../entities/Contact';

import * as express from 'express';
import { validationResult, ValidationChain } from 'express-validator';


export class ContactValidator{

    static validate(validations: ValidationChain[]) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          for (let validation of validations) {
            const result = await validation.run(req);
            if (result.context.errors.length) break;
          }
      
          const errors = validationResult(req);
          if (errors.isEmpty()) {
            return next();
          }
      
          res.status(400).json({ errors: errors.array() });
        };
    };

    static postContacts(){
        const contactRepository = AppDataSource.getRepository(Contact)
        console.log('Post COntact validator')
        return ContactValidator.validate([
            body('name', 'Name is required').isString(),
            body('email', 'Email is required').isEmail(),
            body('phone', 'Phone number is required')
                .isLength({min: 10, max:12})
                .isNumeric()
                .withMessage('Please enter your phone number')
                .custom(async(phone, {req}) => {
                    return await contactRepository.findOneBy({
                        phone: phone
                    }).then(contact => {
                        if(contact){
                            req.errorStatus = 422;
                            throw new Error('Phone number already exist')
                        }else {
                            return true
                        }
                    })
                }),
        ])

    }

    static getContactById(){
        const contactRepository = AppDataSource.getRepository(Contact)
        console.log('1')
        return ContactValidator.validate(
            [
                param('id', 'Id is required').isNumeric()
                                            .custom(async(id, {req})=> {
                                                return await contactRepository.findOneBy({
                                                    id: id
                                                }).then(contact => {
                                                    if(contact){
                                                        return true;
                                                    }else {
                                                        req.errorStatus = 422;
                                                        throw new Error('Please enter valid id')
                                                    }
                                                })
                                            })
            ]
        )
    }

}