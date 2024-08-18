import fs from "node:fs";
import { connect } from "amqp-connection-manager";
import { generateTempFiles } from "./utils/tempFileController.js";
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
      if (fs.existsSync("temp")) {
        fs.promises.rm("temp", { recursive: true });
      }
      // Note that `this` here is the channelWrapper instance.
      return Promise.all([
        channel.assertQueue(QUEUE, { durable: false }), // non-presisting message
        channel.consume(QUEUE, onMessage),
      ]);
    },
  });

  channelWrapper.waitForConnect().then(() => {
    console.log("channel listening to messages....");
  });
}

async function onMessage(msg) {
  let data;
  try {
    data = await JSON.parse(msg.content.toString());
  } catch (e) {
    console.log("WARN: Discarding msg, Err occured during parsing message:", e);
    return;
  }
  // appending testcases to the code to make it executable
  const codeToExecute = await getExecutionCode(data);
  if (!codeToExecute) {
    console.log("WARN: Discarding msg, invalied language provided");
    return;
  }
  generateTempFiles(codeToExecute); // create a temp directory and write the codeToExecute to temp/solution.js
  const result = await executeCode(data);
  // send result to the server

  try {
    await axios.post(process.env.WEBHOOK_URL, result);
  } catch (e) {
    console.log(
      "Axios err during sending the response: Make sure result is defined or not null",
    );
    // console.log(e)
  }
}

connectToRabbitMQ();
