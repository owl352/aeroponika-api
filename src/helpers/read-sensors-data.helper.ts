import { SensorsData } from "../@types";
import fs from "fs";
import { lastSensorsDataPath } from "./contants.helper";
export function readSensorsData(path=lastSensorsDataPath): SensorsData {
  return JSON.parse(
    fs.readFileSync(path).toString()
  ) as SensorsData;
}
