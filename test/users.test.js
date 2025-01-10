import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";
import assert from 'assert'

import chai from 'chai'
const expect = chai.expect

mongoose.connect('mongodb+srv://santiang:0304@cluster0.8clbd.mongodb.net/Adoptme?retryWrites=true&w=majority&appName=Cluster0')

describe("Testeamos el DAO de usuarios", function(){
    before(function(){
        this.usersdao = new Users()
    })
    beforeEach(async function () {
        const collection = mongoose.connection.collection('users');
        await collection.drop().catch(err => {
            // Ignorar error si la colección no existe
            if (err.code !== 26) { // Código 26: "NamespaceNotFound" (colección no existe)
                throw err;
            }
        });
    })

    it("el get de usuarios me debe retornar un array", async function() {
        const result = await this.usersdao.get()
        expect(Array.isArray(result)).to.be.true
    })

    it('el DAO debe poder agrear un usuario nuevo a la Base de Datos', async function () {
        let usuario = {
            first_name: 'Mirtha',
            last_name: 'Legrand',
            email: 'lachiqui@legrand.com',
            password: '1234'
        }
        const result = await this.usersdao.save(usuario)
        expect(result).to.have.property("_id")
        //verifica que lo que recibimos cuente con una propiedad _id
    })
    it('el DAO agregara al documento insertado un array vacio de mascotas por defecto', async function () {
        let usuario = {
            first_name: 'Mirtha',
            last_name: 'Legrand',
            email: 'lachiqui@legrand.com',
            password: '1234'
        }
        const result = await this.usersdao.save(usuario)
        expect(result.pets).to.deep.equal([])
    })
    it('el DAO puede obtener un usuario por email', async function () {
        let usuario = {
            first_name: 'Mirtha',
            last_name: 'Legrand',
            email: 'lachiqui@legrand.com',
            password: '1234'
        }
        const result = await this.usersdao.save(usuario)
        const user = await this.usersdao.getBy({email: result.email})
        expect(user).to.be.an('object')
    })




    after(async function () {
        await mongoose.disconnect()
    })
})