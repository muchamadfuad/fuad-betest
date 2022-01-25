const { Kafka } = require("kafkajs")
const UserService = require("../src/user/user-services")
const {CODE} = require('../utils/response')
require('dotenv').config();

const clientId = process.env.CLIENT_ID
const brokers = [process.env.BROKER_KAFKA]
const topic = process.env.TOPIC

const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId })
const userService = UserService;

const consume = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic })
  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`try create user from kafka with value: ${message.value}`)
      const response = await userService.create(message.value);
      if(response.code === CODE.CREATED)
        console.log(`success create user: ${data}`)
      if(response.code !== CODE.CREATED)
        console.log(`failed create user : ${response.data}`)
    },
  })
}

module.exports = consume
