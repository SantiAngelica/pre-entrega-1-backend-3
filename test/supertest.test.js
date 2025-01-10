import supertest from "supertest";
import chai from 'chai'
const expect = chai.expect

const requester = supertest('http://localhost:8080')

describe('Testing de la app web Adoptame', () => {
    describe('Testing de Mascotas', () => {
        it('POST api/pets, postea una mascota', async () => {
            const mascotaMock = {
                name: 'firulais',
                specie: 'bicho',
                birthDate: '2020-3-13'
            }

            const {statusCode, ok, _body} = await requester.post('/api/pets').send(mascotaMock)

            expect(_body.payload).to.have.property('_id')

        })
    })
})