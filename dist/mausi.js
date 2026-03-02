#!/usr/bin/env node
const { Command } = require("commander");
const axios = require("axios");
const chalk = require("chalk");
const program = new Command();
program.command("greet <name>").action((name) => {
    console.log(chalk.blue(`Kasa Kaay ${name}`));
});
const menu = {
    Murgh_Musallam: 450,
    Garlic_Naan: 150,
    Jeera_Rice: 200,
    Sewai: 250,
    Coke: 100,
};
program.command("menu batao").action(() => {
    console.log(chalk.magenta.bold("\n--- MAUSI KA MENU ---"));
    for (const [item, price] of Object.entries(menu)) {
        console.log(`${chalk.yellow(item)}: ${chalk.green(`₹${price}`)}`);
    }
    console.log(chalk.magenta.bold("---------------------\n"));
});
program.command("bill <actionName> <items...>").action((actionName, items) => {
    let bill = 0;
    let parsedItems = items;
    if (items.length === 1 && items[0].includes(",")) {
        parsedItems = items[0].split(",");
    }
    console.log(chalk.magenta("\n--- BILL BANAYEIN ---"));
    for (const item of parsedItems) {
        const trimItem = item.trim();
        if (menu[trimItem]) {
            console.log(chalk.cyan(`ITEM: ${trimItem} `) +
                chalk.green(`COST: ₹${menu[trimItem]}`));
            bill += menu[trimItem];
        }
        else {
            console.log(chalk.red(`Item not found in menu: ${trimItem}`));
        }
    }
    console.log(chalk.magenta("---------------------"));
    console.log(chalk.green.bold(`Total Bill: ₹${bill}\n`));
});
program.command("gyan do").action(async () => {
    try {
        const res = await axios.get("https://zenquotes.io/api/random");
        console.log(chalk.cyan.italic(`\n"${res.data[0].q}"`));
        console.log(chalk.yellow(`- ${res.data[0].a}\n`));
    }
    catch (err) {
        console.log(chalk.red("Arey beta, gyan nahi mil raha abhi. Internet chalu hai kya?"));
    }
});
program.command("toss").action(() => {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    const color = result === "Heads" ? chalk.green : chalk.blue;
    console.log(chalk.yellow(`Mausi ne sikka uchhala: `) + color.bold(result));
});
program.command("roll").action(() => {
    const result = Math.floor(Math.random() * 6) + 1;
    console.log(chalk.magenta(`Ludo ka dice rolled: `) + chalk.cyan.bold(result));
});
program.command("chai").action(() => {
    console.log(chalk.yellow.bold("☕ Yeh lo beta, garma-garam cutting chai"));
});
program.command("daato <name>").action((name) => {
    const scoldings = [
        `Nalayak ${name}, din bhar phone mein laga rehta hai!`,
        `Arey ${name}, padhai likhai me dhyan lagao IAS-YAS bano!`,
        `${name}, subah jaldi kyu nahi uthte?`,
        `Dekho Sharma ji ke bete ko, aur ek tum ho ${name}!`,
    ];
    const randomScold = scoldings[Math.floor(Math.random() * scoldings.length)];
    console.log(chalk.red.bold(randomScold));
});
program.command("taarif <name>").action((name) => {
    console.log(chalk.green(`Wah ${name} beta, tum toh bade samajhdar ho gaye ho! Jeete raho.`));
});
program.command("weather <city>").action(async (city) => {
    try {
        const res = await axios.get(`https://wttr.in/${city}?format=3`);
        console.log(chalk.cyan(`Mausi kehti hai: \n${res.data.trim()}`));
    }
    catch (err) {
        console.log(chalk.red("Bahar ka mausam abhi nahi dikh raha beta, internet check kar."));
    }
});
program.command("github <username>").action(async (username) => {
    try {
        const res = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                "User-Agent": "Mausi-CLI",
            },
        });
        console.log(chalk.blue.bold(`\n👾 Mausi ne GitHub par dhoond nikala: ${username}`));
        console.log(chalk.cyan(`Name: ${res.data.name || "Nahi diya"}`));
        console.log(chalk.yellow(`Bio: ${res.data.bio || "Nahi diya"}`));
        console.log(chalk.green(`Public Repos: ${res.data.public_repos}`));
        console.log(chalk.magenta(`Followers: ${res.data.followers}\n`));
    }
    catch (err) {
        if (err.response && err.response.status === 404) {
            console.log(chalk.red(`Arey beta, yeh user (${username}) toh GitHub pe nahi mila!`));
        }
        else if (err.response && err.response.status === 403) {
            console.log(chalk.red("Arey beta, GitHub walon ne hume thodi der ke liye block kar diya hai (Rate Limit). Thodi der baad aana!"));
        }
        else {
            console.log(chalk.red(`Arrey, network issue hai shayad. Error: ${err.message}`));
        }
    }
});
program.parse();
