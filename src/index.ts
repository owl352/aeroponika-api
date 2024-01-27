import { expressInit } from "./helpers/express-init.helper"
import { config } from "dotenv"

config()


async function main(){
    expressInit()
}
main()