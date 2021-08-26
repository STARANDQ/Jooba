const colors = require('colors');

class Logger{
    static Message(title, text){
        console.log(this.getDateNow().magenta + " " + title + " " + text);
    }

    static Warn(title, text){
        console.log(this.getDateNow().magenta +  " " + title + " " + ("[ WARN ] ").yellow  + text);
    }

    static Error(title, text){
        console.log(this.getDateNow().magenta + " " + title + " " + ("[ ERROR ] ").red + (text).toString().red);
    }

    static getDateNow(){
        let date = new Date();
        return date.toDateString() + " | " + date.toLocaleTimeString();
    }

    static Mode = {
        SERVER: "[ Server ]".green,
        REGISTER: "[ Register ]".cyan,
        LOGIN: "[ Login ]".blue,
        TEST: "[ Test ]".gray
    }
}

module.exports = Logger;