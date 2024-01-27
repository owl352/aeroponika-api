import fs from "fs";
import { lastSensorsDataPath } from "./contants.helper";

export function writeSensorsData(data: any, path=lastSensorsDataPath) {
  fs.writeFileSync(path, JSON.stringify(data));
}
