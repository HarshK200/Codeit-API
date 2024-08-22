#pragma once
#include "json.hpp"
#include <bits/stdc++.h>
using nlohmann::json;

using JsonValue = std::variant<int, std::vector<int>>;
using TestCases = std::map<std::string, std::map<std::string, JsonValue>>;

// Function to convert JSON object to std::map<std::string, JsonValue>
std::map<std::string, JsonValue> jsonToMap(const json &jsonObj) {
    std::map<std::string, JsonValue> result;
    for (auto &[key, value] : jsonObj.items()) {
        if (value.is_number_integer()) {
            result[key] = value.get<int>();
        } else if (value.is_array()) {
            std::vector<int> vec = value.get<std::vector<int>>();
            result[key] = vec;
        }
    }
    return result;
}
