# Mustan

A Discord bot powered by [Discord.js](https://discord.js.org/), built with **Node.js**, **TypeScript**, and **Google Gemini API** for AI-driven interactions.

---

## ✨ Features

- 🤖 AI-powered responses via **Google Gemini API**
- ⚡ Slash command support with Discord.js v14
- 🛡️ Type-safe codebase using **TypeScript**
- 🔄 Easy to extend with new commands and events

---

## 🛠️ Tech Stack

| Technology | Description |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime environment |
| [TypeScript](https://www.typescriptlang.org/) | Typed superset of JavaScript |
| [Discord.js v14](https://discord.js.org/) | Discord API wrapper for Node.js |
| [Google Gemini API](https://ai.google.dev/) | Generative AI model by Google |

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18.0.0** or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A **Discord Application** and **Bot Token** — create one at the [Discord Developer Portal](https://discord.com/developers/applications)
- A **Google Gemini API Key** — get one at [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ricardolimaa29/Mustan.git
   cd Mustan
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root of the project based on the example below:

   ```env
   # Discord Bot
   DISCORD_TOKEN=your_discord_bot_token_here
   CLIENT_ID=your_discord_application_client_id_here
   GUILD_ID=your_discord_guild_id_here

   # Google Gemini API
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Register slash commands**

   ```bash
   npm run deploy
   ```

---

## ▶️ Running the Bot

### Development (with hot reload)

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
Mustan/
├── src/
│   ├── commands/       # Slash command definitions
│   ├── events/         # Discord event handlers
│   ├── services/       # Gemini API integration & other services
│   ├── deploy.ts       # Script to register slash commands
│   └── index.ts        # Bot entry point
├── .env                # Environment variables (do NOT commit this file)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the bot in development mode with ts-node |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled bot from the `dist/` folder |
| `npm run deploy` | Register/update slash commands on Discord |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
