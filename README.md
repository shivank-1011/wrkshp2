# Mausi CLI

Mausi is a fun and interactive command-line interface (CLI) tool that acts like an Indian aunt. It provides completely random life advice, checks the weather, scolds you for using your phone, generates bills, throws a dice, and now even stalk GitHub profiles!

## Features

- **API integrations:** ZenQuotes (Life advice), Wttr.in (Weather), GitHub (User stalker).
- **Colorful CLI output:** Uses `chalk` to make the terminal vibrant and readable.
- **Fun commands:** Get scolded, praised, or offered chai!

## Prerequisites

- Node.js installed on your machine.
- TypeScript installed globally (optional, but recommended).

## Setup Instructions

1. **Clone the repository (or navigate to the folder).**

   ```bash
   cd wrkshp2
   ```

2. **Install dependencies.**

   ```bash
   npm install
   ```

3. **Build the project.**
   Compiles the `mausi.ts` file into `dist/mausi.js`.

   ```bash
   npx tsc
   ```

4. **Link the package locally.**
   This makes the `mausi` command available globally on your system.
   ```bash
   npm link
   ```

## Available Commands

| Command                              | Description                                              |
| ------------------------------------ | -------------------------------------------------------- |
| `mausi greet <name>`                 | Greets you in Marathi.                                   |
| `mausi menu batao`                   | Shows the current food menu with prices.                 |
| `mausi bill <actionName> <items...>` | Generates a bill for the specified food items.           |
| `mausi gyan do`                      | Returns a random philosophical quote (ZenQuotes API).    |
| `mausi toss`                         | Flips a coin (Heads/Tails).                              |
| `mausi roll`                         | Rolls a standard 6-sided dice.                           |
| `mausi chai`                         | Offers you a hot cup of tea.                             |
| `mausi daato <name>`                 | Mausi scolds you randomly!                               |
| `mausi taarif <name>`                | Mausi praises you!                                       |
| `mausi weather <city>`               | Tells you the current weather for a city (Wttr.in API).  |
| `mausi github <username>`            | Fetches basic info about a GitHub username (GitHub API). |

## Example Usage

**1. Get GitHub user info**

```bash
$ mausi github torvalds

👾 Mausi ne GitHub par dhoond nikala: torvalds
Name: Linus Torvalds
Bio: Nahi diya
Public Repos: 7
Followers: 216744
```

**2. Check the Weather**

```bash
$ mausi weather Delhi
Mausi kehti hai:
Weather report: Delhi
               Mist
       _ - _   15 °C
      _ - _ -  ↘ 6 km/h
       - _ -   1 km
               0.0 mm
```

**3. Ask for Gyan (Quote)**

```bash
$ mausi gyan do

"Quality is not an act, it is a habit."
- Aristotle
```

**4. Generate a bill**

```bash
$ mausi bill khana Murgh_Musallam Garlic_Naan Coke

--- BILL BANAYEIN ---
ITEM: Murgh_Musallam COST: ₹450
ITEM: Garlic_Naan COST: ₹150
ITEM: Coke COST: ₹100
---------------------
Total Bill: ₹700
```

