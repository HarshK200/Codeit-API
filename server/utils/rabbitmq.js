const ampq = require("amqplib");
const QUEUE = "judge";

let connection;
let channel;

async function connectToRabbitMQ() {
  connection = await ampq.connect(process.env.RABBITMQ_URL);

  connection.on("connect", () => {
    console.log("Connected");
  });



  connection.on("disconnect", (err) => {
    console.log("Disconnected", err);
  });

  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: false });
}

async function sendMessage(data) {
  await connectToRabbitMQ();
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)));
}

module.exports = { sendMessage };
