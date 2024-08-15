import { connect } from "amqplib";
import getExecutionCode from "./lang/javascript/twosum.js";
import fs from "node:fs";
import child_process from "node:child_process";
import axios from "axios";

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

    // appending testcases to the code to make it executable
    const executableCode = getExecutionCode(data);
    // writeing the executablecode to a file => if code executes correctly it writes to temp/result.json
    await fs.promises.mkdir("temp", { recursive: false });
    await fs.promises.writeFile("temp/solution.js", executableCode);
    // calling the child_process.exec command and save the stdout to temp/stdout and the stderr to temp/stderr
    child_process.exec("node temp/solution.js", async (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        await axios.post(process.env.WEBHOOK_URL, {
          stdout: stdout,
          stderr: stderr,
        });
        return;
      }

      let result = await fs.promises.readFile("temp/result.json");
      result = JSON.parse(result);
      let testCasesResult = {};
      Object.keys(data.problem.testCases).map((key) => {
        if (arraysEqual(data.problem.testCases[key].output, result[key])) {
          testCasesResult[key] = {
            passed: true,
            expected_output: data.problem.testCases[key].output,
            user_output: result[key],
          };
        } else {
          testCasesResult[key] = {
            passed: false,
            expected_output: data.problem.testCases[key].output,
            user_output: result[key],
          };
        }
      });
      await fs.promises.rm("temp", { recursive: true });
      await axios.post(process.env.WEBHOOK_URL, {
        result: JSON.stringify(testCasesResult),
        stdout: stdout,
        // submissionId: data.submissionId, // TODO
      });
    });

    channel.ack(msg);
  });
} catch (err) {
  // console.log(err);
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((element, index) => element === arr2[index]);
}
