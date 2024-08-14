import { connect } from "amqplib";

const connection = await connect("amqp://localhost:5672");

connection.on("connect", () => {
  console.log("Connected");
});

connection.on("disconnect", (err) => {
  console.log("Disconnected", err);
});

const channel = await connection.createChannel();
const QUEUE = "judge";
await channel.assertQueue(QUEUE, { durable: false });

console.log("listening to messages....");
channel.consume(QUEUE, (msg) => {
  console.log(msg.content.toString());
  channel.ack(msg);
});
