import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { Health, MainInfo, SensorsData } from "../@types";
import { writeSensorsData } from "./write-sensors-data.helper";
import { readSensorsData } from "./read-sensors-data.helper";
import { healthDataPath, mainInfoDataPath } from "./contants.helper";

export function expressInit() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/saveSensors", (req: Request, res: Response) => {
    try {
      const data: SensorsData = {
        light1: req.body.light1!,
        light2: req.body.light2!,
        light3: req.body.light3!,
        lightMid: req.body.lightMid!,
        lightStatus: req.body.lightStatus!,
        waterLevel: req.body.waterLevel!,
        pumpStatus: req.body.pumpStatus!,
        waterStatus: req.body.waterStatus!,
      };
      writeSensorsData(data);
      res.send("ok");
      res.status(200);
    } catch (error) {
      console.error(error);
      res.send((error as Error).message);
      res.status(500);
    }
  });
  app.get("/getSensors", (req: Request, res: Response) => {
    res.send(readSensorsData());
  });
  app.get("/getConfig", (req, res) => {});
  // mainInfo
  app.post("/saveMainInfo", (req: Request, res: Response) => {
    try {
      const data: MainInfo = {
        isDay: req.body.isDay!,
        currentNetwork: req.body.currentNetwork!,
        uptime: req.body.uptime!,
        notifications: req.body.notifications!,
        temp: req.body.temp!,
        humidity: req.body.humidity!,
        light_val: req.body.light_val!,
        pump_good: req.body.pump_good!,
        light_good: req.body.light_good!,
        liquid_good: req.body.liquid_good!,
      };
      writeSensorsData(data, mainInfoDataPath);
      res.send("ok");
      res.status(200);
    } catch (error) {
      console.error(error);
      res.send((error as Error).message);
      res.status(500);
    }
  });

  app.get("/getMainInfo", (req: Request, res: Response) => {
    !res.send(readSensorsData(mainInfoDataPath));
  });

  app.post("/saveHealth", (req: Request, res: Response) => {
    try {
      const data: Health = {
        isGood: req.body.isGood!,
        currentNetwork: req.body.currentNetwork!,
        pump_good: req.body.pump_good!,
        light_count: req.body.light_count!,
        light_good_count: req.body.light_good!,
        liquid_good: req.body.liquid_good!,
        pereferia_good: req.body.pereferia_good!,
        ip: req.body.ip!,
      };
      writeSensorsData(data, healthDataPath);
      res.send("ok");
      res.status(200);
    } catch (error) {
      console.error(error);
      res.send((error as Error).message);
      res.status(500);
    }
  });

  app.get("/getHealth", (req: Request, res: Response) => {
    !res.send(readSensorsData(healthDataPath));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
