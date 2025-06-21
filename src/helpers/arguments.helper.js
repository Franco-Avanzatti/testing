import { Command } from "commander";

const argvs = new Command();


argvs.allowUnknownOption();

argvs.option("--mode <mode>", "to specify mode", "dev");

argvs.parse(process.argv);

export default argvs.opts();
