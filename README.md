# Discord Onboarding Bot

A warm and friendly Discord bot that automatically assigns the "Outer Circle" role to users when they post their first message in the intro channel. The bot responds with randomized, human-like welcome messages to create a welcoming community atmosphere.

## Features

- 🎯 **Smart Role Assignment**: Automatically assigns "Outer Circle" role on first intro message
- 💬 **Warm AI-Like Replies**: Responds with randomized, empathetic welcome messages
- 🚫 **No Spam**: Only responds to users who don't already have the role
- 🔒 **Secure**: Uses environment variables for sensitive data
- 🚀 **24/7 Hosting**: Ready for Railway deployment

## Setup Guide

### 1. Create a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the left sidebar
4. Click "Add Bot"
5. Copy the bot token (you'll need this for `.env`)

### 2. Enable Required Intents

In the Bot section of the Developer Portal:

1. Scroll down to "Privileged Gateway Intents"
2. Enable the following intents:
   - ✅ **SERVER MEMBERS INTENT**
   - ✅ **MESSAGE CONTENT INTENT**

### 3. Invite Bot to Your Server

1. Go to the "OAuth2" → "URL Generator" section
2. Select scopes:
   - ✅ `bot`
3. Select bot permissions:
   - ✅ `Send Messages`
   - ✅ `Manage Roles`
   - ✅ `Read Message History`
4. Copy the generated URL and open it to invite the bot to your server

### 4. Get Channel and Role IDs

#### Enable Developer Mode
1. In Discord, go to User Settings (gear icon)
2. Go to "Advanced" and enable "Developer Mode"

#### Get Channel ID
1. Right-click on your `#intro` channel
2. Click "Copy Channel ID"

#### Get Role ID
1. Go to Server Settings → Roles
2. Right-click on the "Outer Circle" role
3. Click "Copy Role ID"

### 5. Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your values in `.env`:
   ```env
   DISCORD_TOKEN=your_actual_bot_token_here
   INTRO_CHANNEL_ID=your_intro_channel_id_here
   OUTER_CIRCLE_ROLE_ID=your_outer_circle_role_id_here
   ```

### 6. Server Setup

#### Create the "Outer Circle" Role
1. Go to Server Settings → Roles
2. Create a new role called "Outer Circle"
3. Set appropriate permissions for this role

#### Set Channel Permissions
1. For `#rules` and `#intro` channels:
   - Allow `@everyone` to view and read
   - For `#intro`: Allow `@everyone` to send messages
2. For other channels:
   - Deny `@everyone` access
   - Allow "Outer Circle" role access

## Running Locally

### Prerequisites
- Node.js 16.9.0 or higher
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file (see step 5 above)
4. Run the bot:
   ```bash
   npm start
   ```

You should see: `✅ Logged in as YourBotName#1234`

## Deploying on Railway

### Method 1: GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Go to [Railway](https://railway.app)
3. Sign up/login and click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Add environment variables:
   - Go to your project → Variables
   - Add `DISCORD_TOKEN`, `INTRO_CHANNEL_ID`, and `OUTER_CIRCLE_ROLE_ID`
7. Railway will automatically deploy using the `Procfile`

### Method 2: Railway CLI

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```
2. Login to Railway:
   ```bash
   railway login
   ```
3. Initialize project:
   ```bash
   railway init
   ```
4. Add environment variables:
   ```bash
   railway variables set DISCORD_TOKEN=your_token_here
   railway variables set INTRO_CHANNEL_ID=your_channel_id_here
   railway variables set OUTER_CIRCLE_ROLE_ID=your_role_id_here
   ```
5. Deploy:
   ```bash
   railway up
   ```

## How It Works

1. **New Member Joins**: They can only see `#rules` and `#intro` channels
2. **First Message**: When they post in `#intro`, the bot:
   - Checks if they already have "Outer Circle" role
   - If not, assigns the role
   - Replies with a warm, randomized welcome message
3. **Access Granted**: They can now see all channels available to "Outer Circle" members

## Welcome Messages

The bot randomly selects from these warm, human-like messages:

- "Hey {user}, glad you're here 🌟. Take your time exploring — you're now part of the Outer Circle."
- "Welcome aboard, {user} ✨! We've been saving you a seat."
- "It's so good to meet you, {user} 🌸. You've unlocked the Outer Circle — can't wait to see you around."
- "{user}, your journey starts here 🚀. The Outer Circle is wide open for you now."
- "Warmest welcome, {user} 💫. You're among friends."
- And 5 more variations!

## Troubleshooting

### Bot Not Responding
- ✅ Check that the bot is online in your server
- ✅ Verify `INTRO_CHANNEL_ID` matches your intro channel
- ✅ Ensure the bot has "Send Messages" permission in the intro channel

### Role Not Being Assigned
- ✅ Check that `OUTER_CIRCLE_ROLE_ID` is correct
- ✅ Ensure the bot's role is higher than "Outer Circle" in the role hierarchy
- ✅ Verify the bot has "Manage Roles" permission

### Bot Crashes on Startup
- ✅ Verify your `DISCORD_TOKEN` is correct
- ✅ Check that all required intents are enabled
- ✅ Ensure Node.js version is 16.9.0 or higher

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure proper Discord permissions are configured

## License

MIT License - feel free to modify and use for your community!