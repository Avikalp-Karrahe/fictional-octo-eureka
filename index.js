require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const OpenAI = require('openai');

// Create OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Create a new Discord client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Fallback welcome messages for when OpenAI is unavailable
const fallbackMessages = [
    "Hey {user}, glad you're here 🌟. Take your time exploring — you're now part of the Outer Circle.",
    "Welcome aboard, {user} ✨! We've been saving you a seat.",
    "It's so good to meet you, {user} 🌸. You've unlocked the Outer Circle — can't wait to see you around.",
    "{user}, your journey starts here 🚀. The Outer Circle is wide open for you now.",
    "Warmest welcome, {user} 💫. You're among friends."
];

// Function to generate AI-powered contextual welcome message
async function generateContextualWelcome(username, introMessage) {
    try {
        const prompt = `You are a warm, friendly Discord community moderator welcoming a new member to the "Outer Circle" role. 

The new member "${username}" just posted their introduction: "${introMessage}"

Generate a personalized, warm welcome reply that:
- References something specific from their intro message
- Welcomes them to the Outer Circle
- Feels natural and conversational (not robotic)
- Is 1-2 sentences long
- Uses appropriate emojis
- Shows genuine interest in what they shared

Do NOT use generic templates. Make it feel like a real person responding to their specific introduction.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
            temperature: 0.8
        });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('❌ OpenAI API error:', error.message);
        // Fallback to random message if OpenAI fails
        const randomIndex = Math.floor(Math.random() * fallbackMessages.length);
        return fallbackMessages[randomIndex].replace('{user}', username);
    }
}

// Function to get fallback welcome message
function getFallbackWelcomeMessage(username) {
    const randomIndex = Math.floor(Math.random() * fallbackMessages.length);
    return fallbackMessages[randomIndex].replace('{user}', username);
}

// When the client is ready, run this code
client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    
    // Set bot activity status
    client.user.setActivity('for new members 👋', { 
        type: ActivityType.Watching 
    });
    console.log('🎯 Bot activity set: Watching for new members 👋');
});

// Listen for messages
client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;
    
    // Check if the message is in the intro channel
    if (message.channel.id !== process.env.INTRO_CHANNEL_ID) return;
    
    try {
        // Get the guild member
        const member = message.member;
        if (!member) return;
        
        // Check if the user already has the Outer Circle role
        const outerCircleRole = message.guild.roles.cache.get(process.env.OUTER_CIRCLE_ROLE_ID);
        if (!outerCircleRole) {
            console.error('❌ Outer Circle role not found. Please check OUTER_CIRCLE_ROLE_ID in .env');
            return;
        }
        
        // If user already has the role, do nothing
        if (member.roles.cache.has(process.env.OUTER_CIRCLE_ROLE_ID)) {
            return;
        }
        
        // Assign the Outer Circle role
        await member.roles.add(outerCircleRole);
        console.log(`✅ Assigned Outer Circle role to ${member.user.tag}`);
        
        // Generate AI-powered contextual welcome message
        const welcomeMessage = await generateContextualWelcome(member.user.username, message.content);
        await message.reply(welcomeMessage);
        
        console.log(`💬 Sent AI-generated welcome message to ${member.user.tag}`);
        console.log(`📝 Original intro: "${message.content.substring(0, 100)}${message.content.length > 100 ? '...' : ''}"`);
        
    } catch (error) {
        console.error('❌ Error processing intro message:', error);
    }
});

// Error handling
client.on('error', (error) => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);