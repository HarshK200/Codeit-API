const fs = require("node:fs").promises;
const oldFS = require("node:fs");
const path = require("node:path");
const Docker = require("dockerode");
const { createTempFiles, deleteTempFiles } = require("./handleTemp.js");

const docker = new Docker({
  socketPath: process.env.HOST_DOCKER_SOCKET_PATH,
});

async function runCode(userCode, language, problemTitle, testcases) {
  try {
    const images = await docker.listImages();
    let runnerImage = images.find(
      (image) => image.RepoTags[0] === "runner:local",
    );

    // Builds the runner container image if doesn't exsists
    if (!runnerImage) {
      console.log("no runner image found\nbuilding new from dockerfile.....");

      runnerImage = await docker.buildImage(
        {
          context: path.resolve("api/controllers/codeExecution/"),
          src: ["Dockerfile"],
        },
        { t: "runner:local" },
      );

      await new Promise((resolve, reject) => {
        runnerImage.on("data", (data) => {
          process.stdout.write(data.toString());
        });
        runnerImage.on("end", () => {
          console.log("image build finished");
          resolve();
        });
        runnerImage.on("error", () => {
          console.log("some error occured during image build");
          reject();
        });
      });
    }

    // TODO: pass the testcases as a string by doing JSON.stringify()
    // console.log("language:", language)
    // console.log("problem-title:", problemTitle)
    createTempFiles(userCode, language, problemTitle, testcases); // creates the solution.js file with user code and the compute.js needed to execute the code

    const container = await docker.createContainer({
      Image: "runner:local",
      name: "runner",
      HostConfig: {
        Binds: [__dirname + "/temp" + ":/runner/temp"],
        // AutoRemove: true, // deletes the container after the execution is done
      },
      Cmd: ["node", "./temp/compute.js"],
    });

    await container.start(); // executing the user code in the container
    const fileStream = oldFS.createWriteStream(
      __dirname + "/temp/container.log",
      {
        flags: "a",
      },
    );

    await new Promise((resolve, reject) => {
      container.logs(
        {
          follow: true,
          stdout: true,
          stderr: true,
        },
        (err, stream) => {
          if (err) {
            reject("Error fetching logs:" + err);
          }

          stream.on("data", (chunk) => {
            fileStream.write(chunk.toString());
          });

          stream.on("end", () => {
            fileStream.end();
            resolve("the logs were created");
          });
        },
      );
    });

    await container.wait();
    await container.remove();

    // The new result.json file should be created
    let result;
    try {
      result = await fs.readFile(path.join(__dirname, "temp/result.json"), {
        encoding: "utf8",
      });
      result = JSON.parse(result);
    } catch (err) {
      console.log(err);
      result = null;
    }
    let containerLogs = await fs.readFile(
      path.join(__dirname, "temp/container.log"),
      {
        encoding: "utf8",
      },
    );
    deleteTempFiles(); // deletes the temp folder after they are of no use

    return {
      result: result,
      consoleLogs: containerLogs,
    };
  } catch (e) {
    console.log(e);
  }
}

module.exports = { runCode };
