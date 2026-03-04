#!/usr/bin/env node
const { Command } = require("commander");
const axios = require("axios");
const chalk = require("chalk");
class MausiCLI {
  program: any;
  menu: Record<string, number>;

  constructor() {
    this.program = new Command();
    this.menu = {
      Murgh_Musallam: 450,
      Garlic_Naan: 150,
      Jeera_Rice: 200,
      Sewai: 250,
      Coke: 100,
    };
  }

  init() {
    this.registerCommands();
    this.program.parse();
  }

  registerCommands() {
    this.program.command("greet <name>").action((name) => this.greet(name));
    this.program.command("menu batao").action(() => this.showMenu());
    this.program
      .command("bill <actionName> <items...>")
      .action((actionName, items) => this.calculateBill(actionName, items));
    this.program.command("gyan do").action(() => this.giveGyan());
    this.program.command("toss").action(() => this.tossCoin());
    this.program.command("roll").action(() => this.rollDice());
    this.program.command("chai").action(() => this.serveChai());
    this.program.command("daato <name>").action((name) => this.scold(name));
    this.program.command("taarif <name>").action((name) => this.praise(name));
    this.program
      .command("weather <city>")
      .action((city) => this.getWeather(city));
    this.program
      .command("github <username>")
      .action((username) => this.getGithubInfo(username));
  }

  greet(name) {
    console.log(chalk.blue(`Kasa Kaay ${name}`));
  }

  showMenu() {
    console.log(chalk.magenta.bold("\n--- MAUSI KA MENU ---"));
    for (const [item, price] of Object.entries(this.menu)) {
      console.log(`${chalk.yellow(item)}: ${chalk.green(`₹${price}`)}`);
    }
    console.log(chalk.magenta.bold("---------------------\n"));
  }

  calculateBill(actionName, items) {
    let bill = 0;
    let parsedItems = items;
    if (items.length === 1 && items[0].includes(",")) {
      parsedItems = items[0].split(",");
    }

    console.log(chalk.magenta("\n--- BILL BANAYEIN ---"));
    for (const item of parsedItems) {
      const trimItem = item.trim();
      if (this.menu[trimItem]) {
        console.log(
          chalk.cyan(`ITEM: ${trimItem} `) +
            chalk.green(`COST: ₹${this.menu[trimItem]}`),
        );
        bill += this.menu[trimItem];
      } else {
        console.log(chalk.red(`Item not found in menu: ${trimItem}`));
      }
    }
    console.log(chalk.magenta("---------------------"));
    console.log(chalk.green.bold(`Total Bill: ₹${bill}\n`));
  }

  async giveGyan() {
    try {
      const res = await axios.get("https://zenquotes.io/api/random");
      console.log(chalk.cyan.italic(`\n"${res.data[0].q}"`));
      console.log(chalk.yellow(`- ${res.data[0].a}\n`));
    } catch (err) {
      console.log(
        chalk.red(
          "Arey beta, gyan nahi mil raha abhi. Internet chalu hai kya?",
        ),
      );
    }
  }

  tossCoin() {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    const color = result === "Heads" ? chalk.green : chalk.blue;
    console.log(chalk.yellow(`Mausi ne sikka uchhala: `) + color.bold(result));
  }

  rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    console.log(
      chalk.magenta(`Ludo ka dice rolled: `) + chalk.cyan.bold(result),
    );
  }

  serveChai() {
    console.log(chalk.yellow.bold("☕ Yeh lo beta, garma-garam cutting chai"));
  }

  scold(name) {
    const scoldings = [
      `Nalayak ${name}, din bhar phone mein laga rehta hai!`,
      `Arey ${name}, padhai likhai me dhyan lagao IAS-YAS bano!`,
      `${name}, subah jaldi kyu nahi uthte?`,
      `Dekho Sharma ji ke bete ko, aur ek tum ho ${name}!`,
    ];
    const randomScold = scoldings[Math.floor(Math.random() * scoldings.length)];
    console.log(chalk.red.bold(randomScold));
  }

  praise(name) {
    console.log(
      chalk.green(
        `Wah ${name} beta, tum toh bade samajhdar ho gaye ho! Jeete raho.`,
      ),
    );
  }

  async getWeather(city) {
    try {
      const res = await axios.get(`https://wttr.in/${city}?format=3`);
      console.log(chalk.cyan(`Mausi kehti hai: \n${res.data.trim()}`));
    } catch (err) {
      console.log(
        chalk.red(
          "Bahar ka mausam abhi nahi dikh raha beta, internet check kar.",
        ),
      );
    }
  }

  async getGithubInfo(username) {
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          "User-Agent": "Mausi-CLI",
        },
      });
      console.log(
        chalk.blue.bold(`\n👾 Mausi ne GitHub par dhoond nikala: ${username}`),
      );
      console.log(chalk.cyan(`Name: ${res.data.name || "Nahi diya"}`));
      console.log(chalk.yellow(`Bio: ${res.data.bio || "Nahi diya"}`));
      console.log(chalk.green(`Public Repos: ${res.data.public_repos}`));
      console.log(chalk.magenta(`Followers: ${res.data.followers}\n`));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(
          chalk.red(
            `Arey beta, yeh user (${username}) toh GitHub pe nahi mila!`,
          ),
        );
      } else if (err.response && err.response.status === 403) {
        console.log(
          chalk.red(
            "Arey beta, GitHub walon ne hume thodi der ke liye block kar diya hai (Rate Limit). Thodi der baad aana!",
          ),
        );
      } else {
        console.log(
          chalk.red(`Arrey, network issue hai shayad. Error: ${err.message}`),
        );
      }
    }
  }
}

const mausiApp = new MausiCLI();
mausiApp.init();
