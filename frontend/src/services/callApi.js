import {callApi} from './api/api';
const qs = require('qs');


export const getlAllContact = async () => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/api/contacts',
    };

    const response = await callApi(config);

    return response;
    
}


export const postContacts = async (data) =>{

    data = qs.stringify(data)

    let config = {
        method: 'post',
        url: '/api/contacts/',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        data : data
    };

    const response = await callApi(config);

    return response;

}

export const updateContact = async (data, id) =>{

    data = qs.stringify(data)

    let config = {
        method: 'put',
        url: `/api/contacts/${id}`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        data : data
      };

    const response = await callApi(config);

    return response;

}

export const getContactById = async (id) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/contacts/${id}`,
    };

    const response = await callApi(config)

    return response

}


export const deleteContactbyId = async (id) => {

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `/api/contacts/${id}`,
    };

    const response = await callApi(config)

    return response

}