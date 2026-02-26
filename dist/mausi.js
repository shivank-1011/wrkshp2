#!/usr/bin/env node
const { Command } = require("commander");
const axios = require("axios");
const program = new Command();
program.command("greet <name>").action((name) => {
    console.log(`Kasa Kaay ${name}`);
});
const menu = {
    Murgh_Musallam: 450,
    Garlic_Naan: 150,
    Jeera_Rice: 200,
    Sewai: 250,
    Coke: 100,
};
program.command("menu batao").action(() => {
    console.log(menu);
});
program.command("bill <actionName> <items...>").action((actionName, items) => {
    let bill = 0;
    let parsedItems = items;
    if (items.length === 1 && items[0].includes(",")) {
        parsedItems = items[0].split(",");
    }
    for (const item of parsedItems) {
        const trimItem = item.trim();
        if (menu[trimItem]) {
            console.log("ITEM:", trimItem, "COST:", menu[trimItem]);
            bill += menu[trimItem];
        }
        else {
            console.log(`Item not found in menu: ${trimItem}`);
        }
    }
    console.log(bill);
});
program.command("gyan do").action(async () => {
    try {
        const res = await axios.get("https://zenquotes.io/api/random");
        console.log(res.data[0].q);
    }
    catch (err) {
        console.log("Error");
    }
});
program.command("toss").action(() => {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    console.log(`Mausi ne sikka uchhala: ${result}`);
});
program.command("roll").action(() => {
    const result = Math.floor(Math.random() * 6) + 1;
    console.log(`Ludo ka dice rolled: ${result}`);
});
program.command("chai").action(() => {
    console.log("Yeh lo beta, garma-garam cutting chai");
});
program.command("daato <name>").action((name) => {
    const scoldings = [
        `Nalayak ${name}, din bhar phone mein laga rehta hai!`,
        `Arey ${name}, padhai likhai me dhyan lagao IAS-YAS bano!`,
        `${name}, subah jaldi kyu nahi uthte?`,
        `Dekho Sharma ji ke bete ko, aur ek tum ho ${name}!`,
    ];
    const randomScold = scoldings[Math.floor(Math.random() * scoldings.length)];
    console.log(randomScold);
});
program.command("taarif <name>").action((name) => {
    console.log(`Wah ${name} beta, tum toh bade samajhdar ho gaye ho! Jeete raho.`);
});
program.command("weather <city>").action(async (city) => {
    try {
        const res = await axios.get(`https://wttr.in/${city}?format=3`);
        console.log(`Mausi kehti hai: ${res.data.trim()}`);
    }
    catch (err) {
        console.log("Bahar ka mausam abhi nahi dikh raha beta, internet check kar.");
    }
});
program.parse();
