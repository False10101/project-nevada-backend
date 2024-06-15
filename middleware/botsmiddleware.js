import testbot from "../controllers/bots/testbot.js";

// Middleware to handle non-command messages
testbot.on('message', (msg) => {
  const isCommand = msg.text && msg.text.startsWith('/');
  
  if (!isCommand) {
    testbot.sendMessage(msg.chat.id, "Please only use bot commands. Type /help to see the list of available commands.");
  }
});
