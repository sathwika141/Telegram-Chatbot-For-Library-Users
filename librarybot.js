const TelegramBot = require('node-telegram-bot-api')
const request = require('request')
var mongojs = require('mongojs')

const apikey = "1795231334:AAFDzuv9BkBvU8ZpVUTQn7hdLj9337hi0hs"

var cstring = 'mongodb+srv://saijahnavi:saijahnavi@cluster0.abe7g.mongodb.net/projectlibrary?retryWrites=true&w=majority'
var db = mongojs(cstring, ['students'])

const bot = new TelegramBot(apikey, {polling: true});

bot.on('message', (msg) => {
    var a = msg.text
    if(a == '/start') {
        bot.sendMessage(msg.chat.id, 'Welcome to InterActive ChatBot With Library Users!!!')
        bot.sendMessage(msg.chat.id, "If you want the data about available books in Library.Please check the description once") 
    }
    //else if(a.toUpperCase() == "HI" || a.toUpperCase() == "HELLO"){
      //  bot.sendMessage(msg.chat.id, a.toUpperCase() + "!! Welcome to InterActive ChatBot With Library Users...Enter the Option You needed")
    //}
    else if(a == "1"){
        bot.sendPhoto(msg.chat.id,'https://lh3.googleusercontent.com/proxy/bB5P_sGLatrpm4kljmzm6K1bo3KgtdyATn8IniHVx1j6n-N7eWoYH4VIEtXy30Q2qHsNeJKbdS8G7qbjtXOjxA')
        bot.sendMessage(msg.chat.id,'Shri Vishnu Engineering College For Women is located in Bhimavaram - the central part of Coastal Andhra.The area generally known for its commercial activities has recently established itself as a Center for Academics. \nThe campus is located in Vishnupur which is 3 km from Bhimavaram on Tadepalligudem Road. \n SVECW, a higher-education institution set up exclusively for women students, provides an excellent opportunity to them for acquiring specific skills and knowledge, fostering their creativity and nurturing their innovative prowess leading to their intellectual development.')
    }
    else if(a == "2"){
        bot.sendLocation(msg.chat.id,16.5681,81.5221);
    }
    else {
        
        var data = a.split('/')
        if(data.length <= 1){
            bot.sendMessage(msg.chat.id,"Invalid Format. Please check the data again.")
        }
        else if(data[0] == "3") {
            
            db.students.find({year : data[1] , branch : data[2] , sem : data[3] ,  date: data[4]}, function(err, docs){
                console.log(docs);
                if(docs.length <= 0) 
                    bot.sendMessage(msg.chat.id, "No data available. Please reenter the data.") 
                else{
                    for(var i = 0;i < docs.length; i++) {
                        bot.sendMessage(msg.chat.id, "\nBook Name: " + docs[i].bookname + "\nBook serial No: " + docs[i].bookserialno + "\nNo. of Books: " + docs[i].books);
                    }
                }
                    
            
            })
        }
    }
       
})
bot.on("polling_error", (err) => console.log(err));



