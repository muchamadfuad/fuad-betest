const { Kafka } = require("kafkajs")
const UserService = require("../src/user/user-services")
const {CODE} = require("../utils/response")
require("dotenv").config();

const clientId = process.env.CLIENT_ID
const brokers = [process.env.CLOUDKARAFKA_BROKERS_01, process.env.CLOUDKARAFKA_BROKERS_02, process.env.CLOUDKARAFKA_BROKERS_03]
const topic = process.env.CLOUDKARAFKA_TOPIC_PREFIX

const kafka = new Kafka({
  clientId: clientId,
  brokers: brokers,
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.CLOUDKARAFKA_USERNAME,
    password: process.env.CLOUDKARAFKA_PASSWORD
  },
})
const consumer = kafka.consumer({ groupId: clientId })
const userService = UserService;

const consume = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic })
  await consumer.run({
    eachMessage: async ({ message }) => {
      const user = JSON.parse(message.value);
      const response = await userService.createUser(user);
      if(response.code === CODE.CREATED)
        console.log(`success create user: ${response.data}`)
      if(response.code !== CODE.CREATED)
        console.log(`failed create user : ${response.data}`)
    },
  })
}

module.exports = consume
