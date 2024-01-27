import { SensorsData } from "../@types";
import fs from "fs";
import { lastSensorsDataPath } from "./contants.helper";
export function readSensorsData(path = lastSensorsDataPath): any {
  if (!fs.existsSync(path)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(path).toString());
}
