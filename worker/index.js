import { connect } from "amqplib";
import getExecutionCode from "./lang/javascript/twosum.js";
import fs from "node:fs";
import child_process from "node:child_process";

try {
  const connection = await connect(process.env.RABBITMQ_URL);

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
  // getting the data from the queue
  channel.consume(QUEUE, async (msg) => {
    const data = JSON.parse(msg.content.toString());

    // TODO: append testcases to the code to make it executable
    const executableCode = getExecutionCode(data);
    // TODO:write the executablecode to a file => if code executes correctly it writes to temp/result.json
    await fs.promises.mkdir("temp", { recursive: false });
    await fs.promises.writeFile("temp/solution.js", executableCode);
    // TODO:call the child_process.exec command and save the stdout to temp/stdout and the stderr to temp/stderr
    child_process.exec("node temp/solution.js", async (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        await fs.promises.writeFile("temp/stderr", stderr);
        return;
      }
      await fs.promises.writeFile("temp/stdout", stdout);
    });

    // read the result.json into a result variable;

    // delete the temp folder

    channel.ack(msg);
  });
} catch (err) {
  console.log(err);
}
