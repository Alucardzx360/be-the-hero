const request = require('supertest');
const app = require('../../src/app.js');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "ACAPAM3",
            email: "acapam@gmail.com",
            whatsapp: "84000000000",
            city: "Caicó",
            uf: "RN"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);   
    });
});