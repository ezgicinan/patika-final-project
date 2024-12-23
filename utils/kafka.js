const { Kafka } = require('kafkajs')

//const kafka = new Kafka({
//    brokers: [process.env.KAFKA_BROKER] });

const kafka = new Kafka({
    clientId: 'my-kafka-producer2',
    brokers: ['localhost:9092'] }); 


const producer = kafka.producer()

async function sendMessage(topic,message){
    await producer.connect()
    await producer.send({
        topic: 'order',
        messages:[
            { value : "order hey patika final test "},
        ],
    })
}

module.exports = {
    sendMessage
}