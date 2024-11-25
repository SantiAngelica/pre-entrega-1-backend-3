import { petsService, usersService } from "../services/index.js"
import mocksServices from "../services/mocks.services.js"

const getMockingPets = async (req, res) => {
    try {
        const pets = await mocksServices.generateMockingPets(100)
        res.send({status: "success", payload: pets})      
    } catch (error) {
        console.log(error)
        res.send({status: "error"})   
    }
}

const getMockingUsers = async (req, res) => {
    try {
        const users = await mocksServices.generateMockingUsers(50)
        res.send({status: 'success', payload: users})
    } catch (error) {
        console.log(error)
        res.send({status: "error"})
    }
}

const generateData = async (req, res) => {
    const {users, pets} = req.body
    try {
        const created = await mocksServices.generateData(Number(users), Number(pets))
        res.send({status: 'success', payload: created})
    } catch (error) {
        console.log(error)
        res.send('error')
    }
}

const getDBPets = async (req, res) => {
    try {
        const pets = await petsService.getAll()
        res.send({status: 'success', payload: pets})
    } catch (error) {
        res.send('error')
    }
}

const getDBUsers = async (req, res) => {
    try {
        const users = await usersService.getAll()
        res.send({status: 'success', payload: users})
    } catch (error) {
        res.send('error')
    }
}

export default {
    getMockingPets,
    getMockingUsers,
    generateData,
    getDBPets,
    getDBUsers,
}