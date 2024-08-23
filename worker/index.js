import fs from "node:fs";
import { connect } from "amqp-connection-manager";
import {
  deleteTempFiles,
  generateTempFiles,
} from "./utils/tempFileController.js";
import getExecutionCode from "./utils/getExecutionCode.js";
import executeCode from "./utils/handleExecution.js";
import axios from "axios";
const QUEUE = "judge";

async function connectToRabbitMQ() {
  const connection = connect(process.env.RABBITMQ_URL);

  connection.on("connect", () => {
    console.log("Rabbitmq connected!");
  });

  connection.on("disconnect", () => {
    console.log("Rabbitmq disconnected!");
  });

  const channelWrapper = connection.createChannel({
    setup: function (channel) {
      // Note that `this` here is the channelWrapper instance.
      return Promise.all([
        channel.assertQueue(QUEUE, { durable: false }), // non-presisting message
        channel.prefetch(1),
        channel.consume(QUEUE, (msg) => {
          onMessage(msg, channelWrapper);
        }),
      ]);
    },
  });

  channelWrapper.waitForConnect().then(() => {
    console.log("channel listening to messages....");
  });
}

async function onMessage(msg, channelWrapper) {
  let data;
  try {
    data = await JSON.parse(msg.content.toString());
    // console.log(data);
  } catch (e) {
    console.log("WARN: Discarding msg, Err occured during parsing message:", e);
    return;
  }
  const folderName = "temp/" + data.userId;
  const codeToExecute = await getExecutionCode(data, folderName);

  if (!codeToExecute) {
    console.log("WARN: Discarding msg, err getting ExecutionCode");
    return;
  }
  await generateTempFiles(
    folderName,
    codeToExecute,
    data.language.toLowerCase(),
  ); // create a temp directory and write the codeToExecute to temp/solution.*
  const result = await executeCode(data, folderName);
  await deleteTempFiles(folderName);

  // send result to the server
  try {
    console.log("calling channelWrapper.ack();");
    channelWrapper.ack(msg);
    await axios.post(process.env.WEBHOOK_URL, result);
  } catch (e) {
    console.log(
      "Axios err during sending the response: Make sure result is defined or not null",
      e,
    );
  }
}

connectToRabbitMQ();
