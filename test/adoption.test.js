import supertest from "supertest";
import chai from 'chai';

const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe('Router de adoptions', () => {
    describe('GET /api/adoptions', () => {
        it('Deberia retornar una lista de adopciones', async () => {
            const {status} = await requester.get('/api/adoptions')
            expect(status).to.equal(200)
        })

        it('Retorna 404 si la ruta no existe', async () => {
            const {status} = await requester.get('/adoptions/noexiste');
            expect(status).to.equal(404)
        })

        it('Deberia retornar info de una adopcion existente', async () => {
            let aid = '67816800dba57c955a67242d'
            const { status } = await requester.get(`/api/adoptions/${aid}`)
            expect(status).to.equal(200)
        })

        it('Deberia retornar 404 si la adopcion no existe', async () => {
            let inValidAID = '67816800dba57c955a67242e'
            const { status } = await requester.get(`/api/adoptions/${inValidAID}`)
            expect(status).to.equal(404)
        })

        it('Deberia crear una adopcion', async () => {
            let uid = '67506a6adf0123d9fc87296b'
            let pid = '67816768142560a2cdddd608'
            const { status } = await requester.post(`/api/adoptions/${uid}/${pid}`)
            expect(status).to.equal(200)
        })
        it('Retorna 400 si la mascota esta adoptada', async () => {
            let uid = '67506a6adf0123d9fc87296b'
            let Adoptedpid = '67816645b285e5fb833edf94'
            const { status } = await requester.post(`/api/adoptions/${uid}/${Adoptedpid}`)
            expect(status).to.equal(400)
        })
        it('Retorna 404 si la mascota o el usuario no existe', async () => {
            let inValiduid = '67506a6adf0123d9fc872945'
            let inValidpid = '67816645b285e5fb833edt45'
            const { status } = await requester.post(`/api/adoptions/${inValiduid}/${inValidpid}`)
            expect(status).to.equal(404)
        })
     })
})