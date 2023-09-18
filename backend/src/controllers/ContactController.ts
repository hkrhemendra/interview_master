import * as fs from 'fs';
import {
    Contact
} from '../entities/Contact';
import {
    AppDataSource
} from '../data-source';

export class ContactController {

    static async getContacts(req, res, next) {
        const contactRepository = AppDataSource.getRepository(Contact);
        const contactId = req.params['id'];
        try{
            if(contactId){

                const contact = await contactRepository.findOneBy({
                    id: contactId
                });

                if(contact){
                    return res.json({
                        status: 200,
                        data: contact
                    })
                }
                
            }

            const listContacts = await contactRepository.find();
            return res.json({
                status: 200,
                data: listContacts
            })
            
        }catch(error){
            next(error)
        }

    }

    static async postContacts(req, res, next) {
        console.log(req.body)
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const address = req.body.address;
        const active = req.body.active;
        const imageUrl = req.body.imageUrl;

        try {

            const contact = new Contact();

            contact.name = name;
            contact.phone = phone;
            contact.email = email;
            contact.address = address;
            contact.active = active;
            contact.img_url = imageUrl;

            const contactRepository = AppDataSource.getRepository(Contact);

            await contactRepository.save(contact)

            res.json({
                status: 200,
                message: 'data added successfully'
            })

        } catch (e) {
            next(e)
        }
    }


    static async updateContact(req, res, next){

        const contactRepository = AppDataSource.getRepository(Contact);
        const contactId = req.params['id'];

        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const address = req.body.address;
        const active = req.body.active;
        const imageUrl = req.body.imageUrl;

        try {
            
            const contact = await contactRepository.findOneBy({
                id: contactId
            })

            if(contact){
            
                contact.name = name;
                contact.phone = phone;
                contact.email = email;
                contact.address = address;
                contact.active = active;
                contact.img_url = imageUrl;

                await contactRepository.save(contact)
                return res.json({
                    status: 200,
                    data: contact
                })
            
            }else {
                return res.json({
                    status: 400,
                    message: "User Id not found"
                })
            }

        } catch (error) {
            next(error)
        }

    }

    
    static async deleteContact(req, res, next){

        const contactRepository = AppDataSource.getRepository(Contact);
        const contactId = req.params['id']

        try {
            const contact = await contactRepository.findOneBy({
                id: contactId
            })

            if(contact){
                await contactRepository.remove(contact)
                return res.json({
                    status: 200, 
                    message: `Contact with id ${contactId} deleted successfully`
                })

            }
            
        } catch (error) {
            next(error)
        }

    }

}