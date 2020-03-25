const crypto = require('crypto'); //importando a biblioteca
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*'); //guarda tdos os registros do bd na variavel ongs
        return response.json(ongs);

    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; //cada variavel recebe os parametros

        const id = crypto.randomBytes(4).toString('HEX'); //o id vai receber criptografado e convertindo para uma string de bits.

        await connection('ongs').insert({ //não consegui compilar com await
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })


        return response.json({ id }); //retorna o id da ong cadastrada e gerada random
    }

};