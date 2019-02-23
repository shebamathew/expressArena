const express = require('express'); 
const morgan = require('morgan'); 

const app = express(); 
app.use(morgan('dev')); 

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
}); 

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
}); 

app.get('/pizza/pineapple', (req, res) => {
    res.send('We don\'t serve that here. Never call again!');
}); 

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a); 
    const b = parseInt(req.query.b); 
    const c = a+b; 
    res.send(`The sum of ${a} and ${b} is ${c}`); 
}); 

app.get('/cipher', (req, res) => {
    const text = req.query.text; 
    const shift = parseInt(req.query.shift); 
    const result = ' '; 
    const unicode = text
       .split('')
       .map(char => {
            const charCode = char.charCodeAt(0)
            // TODO: make base to refactor code 
            if (charCode >= 65 && charCode <= 90) {
                const newShift = ((charCode + shift)  - 65) % 26; 
                return String.fromCharCode(65 + newShift);  
            }
            //if lowercase 
            if (charCode >= 97 && charCode <= 122 ){
                const newShift = ((charCode + shift)  - 97) % 26; 
                return String.fromCharCode(97 + newShift);  
            }
        })
        .join('')
    res.send(unicode); 
}); 

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers.map(num => parseInt(num)); 
    
    if (numbers.length !== 6) {
        return res.status(400).send('Numbers must be an array of 6 numbers');
    }

    for (i=0; i<6; i++) {
        if (numbers[i] < 1 || numbers[i] > 20) {
            return res.status(400).send('Numbers must be between 1 and 20');
        }
    }
    let randArr = []; 
    for (i=0; i<6; i++) {
        randArr.push(Math.floor((Math.random() * 20) + 1)); 
    }
    
    const match = randArr.filter(numbers.includes).length; 
    
    switch (match) {
        case 6: 
            responseText = 'Wow! Unbelievable! You could have won the mega millions!';
            break;
        case 5:   
            responseText = 'Congratulations! You win $100!';
            break;
        case 4:
            responseText = 'Congratulations, you win a free ticket!';
            break;
        default:
            responseText = 'Sorry, you lose'; 
    }

    res.send(responseText); 
}); 
 
app.get('/hello', (req, res) => {
    res.status(204).end(); 
}); 

app.get('/video', (req, res) => {
    const video = {
        title: 'Cats falling over', 
        description: '15 minutes of fun', 
        length: '15.40'
    }
    res.json(video); 
}); 

app.get('/colors', (req, res) => {
    const colors = [
      {
        name: "red",
        rgb: "FF0000"
      },
      {
        name: "green",
        rgb: "00FF00"
      }, 
      {
        name: "blue",
        rgb: "0000FF"
      },
    ];
    res.json(colors);
});


app.get('/grade', (req, res) => {
    // get the mark from the query
    const { mark } = req.query;
  
    // do some validation
    if(!mark) {
      // mark is required
      return res
        .status(400)
        .send("Please provide a mark");
    }
  
    const numericMark = parseFloat(mark);
    if(Number.isNaN(numericMark)) {
      // mark must be a number
      return res
        .status(400)
        .send("Mark must be a numeric value");
    }
  
    if(numericMark < 0 || numericMark > 100) {
      // mark must be in range 0 to 100
      return res
        .status(400)
        .send("Mark must be in range 0 to 100");
    }
  
    if(numericMark >= 90) {
      return res
        .send("A");
    } 
  
    if(numericMark >= 80) {
      return res
        .send("B");
    }
  
    if(numericMark >= 70) {
      return res
        .send("C");
    }
  
    res
      .send("F");
});


app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});



app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

