function updateExecutionState(req, res) {
  const data = req.body;
  console.log("STDOUT: ", data.stdout)
  console.log(JSON.parse(data.result));
}

module.exports = { updateExecutionState };
