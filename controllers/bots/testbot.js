import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';
import database from '../../database/database.js';

const getUsernameByChatId = (chatId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT username FROM user_profile WHERE telegram_chat_id = ?';
      database.query(query, [chatId], (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length > 0) {
          return resolve(results[0].username);
        } else {
          return resolve(null); // No user found
        }
      });
    });
  };
  

const testbot = new TelegramBot(process.env.testBotToken, { polling: true });

testbot.onText(/\/start/,async (msg) => {
    const chatId = msg.chat.id;
    try {
      const username = await getUsernameByChatId(chatId);
      if (username) {
        testbot.sendMessage(chatId, `Welcome, ${username}!`);
      } else {
        testbot.sendMessage(chatId, 'Welcome! Your username is not found in the database.');
      }
    } catch (error) {
      console.error('Database query error:', error);
      testbot.sendMessage(chatId, 'An error occurred while fetching your username.');
    }
  });

testbot.onText(/\/help/, (msg) => {
  testbot.sendMessage(msg.chat.id, "Available commands:\n/start - Start the bot\n/help - Get help information");
});


// Error handling for polling errors
testbot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.code} - ${error.message}`);
  if (error.code === 'EFATAL') {
    console.log('Attempting to reconnect...');
    setTimeout(() => {
      testbot.startPolling()
        .then(() => console.log('Reconnected successfully'))
        .catch((pollError) => console.error('Reconnection error:', pollError));
    }, 5000); 
  }
});


export default testbot;
