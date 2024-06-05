const request = require('supertest');
const app = require('../index');
const matcher = require('jest-extended')
expect.extend(matcher);

describe('API Test', () => {

    let idEdit;
    // test get all todos
    test('GET /api/todos', async () => {
        const response = await request(app)
                            .get('/api/todos');

        expect(response.status).toEqual(200);
        expect(response.body).toBeArray();
    })

    // test get single todo
    test('GET /api/todos/1', async()=>{
        const response = await request(app)
                            .get('/api/todos/1');
        
        expect(response.status).toEqual(200);
        expect(response.body).toBeObject();

    })

    // test post a todo
    test('POST /api/todos', async()=>{
        const response = await request(app)
                            .post('/api/todos')
                            .send({
                                title: 'test',
                                description: 'test'
                            });
        expect(response.status).toEqual(201);
        expect(response.body).toBeObject();
        expect(response.body.message).toEqual('Data inserted')
    })

    // test edit a todo
    test('PUT /api/todos/2', async () => {
        const response = await request(app)
                            .put('/api/todos/2')
                            .send({
                                title: 'test PUT',
                                description: 'test PUT'
                            })
        expect(response.status).toEqual(200)
    })

    // test delete a todo
    test('DELETE /api/todos/2', async () => {
        const response = await request(app)
                            .delete('/api/todos/2')
        expect(response.status).toEqual(200)  
    })
})
