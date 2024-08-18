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
  generateTempFiles(codeToExecute); // create a temp directory and write the executable Code to temp/solution.js
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

//
// // old code
// try {
//   // getting the data from the queue
//   channel.consume(QUEUE, async (msg) => {
//     // calling the child_process.exec command and save the stdout to temp/stdout and the stderr to temp/stderr
//     child_process.exec("node temp/solution.js", async (err, stdout, stderr) => {
//       if (err) {
//         console.log(err);
//         let testCasesResult = {};
//         Object.keys(data.problem.testCases).map((key) => {
//           testCasesResult[key] = { passed: false };
//         });
//         try {
//           await axios.post(process.env.WEBHOOK_URL, {
//             result: result,
//             stdout: stdout,
//             stderr: stderr,
//             submissionId: data.submissionId,
//           });
//         } catch (e) {
//           await fs.promises.rm("temp", { recursive: true });
//           console.log("rabbit mq disconnect");
//         }
//         return;
//       }
//
//       let result = await fs.promises.readFile("temp/result.json");
//       result = JSON.parse(result);
//       let testCasesResult = {};
//       Object.keys(data.problem.testCases).map((key) => {
//         if (arraysEqual(data.problem.testCases[key].output, result[key])) {
//           testCasesResult[key] = {
//             passed: true,
//             expected_output: data.problem.testCases[key].output,
//             user_output: result[key],
//           };
//         } else {
//           testCasesResult[key] = {
//             passed: false,
//             expected_output: data.problem.testCases[key].output,
//             user_output: result[key],
//           };
//         }
//       });
//       await fs.promises.rm("temp", { recursive: true });
//       try {
//         await axios.post(process.env.WEBHOOK_URL, {
//           result: JSON.stringify(testCasesResult),
//           stdout: stdout,
//           submissionId: data.submissionId,
//         });
//       } catch (e) {
//         console.log("rabbit mq disconnect");
//       }
//     });
//
//     channel.ack(msg);
//   });
// } catch (err) {
//   console.log(err);
// }
//     channel.ack(msg);
