import { faker } from "@faker-js/faker"
import { createHash } from "../utils/index.js"
import { petsService, usersService } from "./index.js"

class MocksServices{
    async generateMockingPets(cant){
        let pets = []

        for(let i = 0; i < cant; i++){
            pets.push({
                name: faker.animal.petName(),
                specie: faker.animal.type(),
                birthDate: faker.date.past(),
                adopted: false,
                image: "https://via.placeholder.com/150"
            })
        }
        return pets
    }
    async generateMockingUsers(cant){
        let users = []

        for(let i = 0; i < cant; i++){
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash('coder123'),
                role: faker.helpers.arrayElement(['admin', 'user', 'user']),
                pets: []
            })
        }
        return users
    }
    async generateData(cantUsers, cantPets){
        const pets = await this.generateMockingPets(cantPets)
        petsService.insert(pets)
        const users = await this.generateMockingUsers(cantUsers)
        usersService.insert(users)
        return {
            users: cantUsers,
            pets: cantPets
        }
    }
}

export default new MocksServices()