// #include "./include/structs.cpp"
json jsonStr = json::parse(
    R"({"0":{"nums":[2,7,11,15],"output":[0,1],"target":9},
    "1":{"nums":[3,2,4],"output":[1,2],"target":6},
    "2":{"nums":[3,3],"output":[0,1],"target":6}})");
// The above lines should be removed form the final main.cpp

int main() {
  TestCases resultMap;
  for (auto &[key, value] : jsonStr.items()) {
    resultMap[key] = jsonToMap(value); // Convert each JSON object to map
  }

  // Accessing the "nums" array for the first key
  std::vector<int> nums = std::get<std::vector<int>>(resultMap["1"]["output"]);

  std::cout << "ouput: ";
  for (int num : nums) {
    std::cout << num << " ";
  }

  // std::cout << "\ntarget: " << std::get<int>(resultMap["0"]["target"]) <<
  // std::endl;

  return 0;
}
