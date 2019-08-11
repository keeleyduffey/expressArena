const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express! Again!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
  res.send("Your pizza is on the way!");
})

app.get('/pizza/pineapple', (req, res) => {
  res.send("We don't serve that here. Never call again!");
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    IP: ${req.ip}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if(!a || !b) {
    return res.status(400).send('Please provide a number');
  }

  const sum = `The sum of ${a} and ${b} is ${a + b}`;

  res.send(sum);
});


app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = parseFloat(req.query.shift);

  if(!text) {
    return res.status(400).send('Please provide some text');
  }

  if(!shift) {
    return res.status(400).send('Please provide a number to shift');
  }

	let ciphertext = "";    
	const re = /[a-z]/;
	for(i=0; i<text.length; i++){ 
	  if(re.test(text.charAt(i))) ciphertext += String.fromCharCode((text.charCodeAt(i) - 97 + shift)%26 + 97); 
	  else ciphertext += text.charAt(i); 
	} 

  res.send(ciphertext);
});

app.get('/lotto', (req, res) => {
  const numbers = req.query.numbers;
  // const shift = parseInt(req.query.shift, 10);

  if(!numbers || numbers.length !== 6) {
    return res.status(400).send('Please provide 6 different numbers');
  }
	
	const list = [];
	for (let i = 0; i <= 5; i++) {
	  list.push((Math.floor(Math.random() * 21) + 1).toString());
	}

	let count = 0;
	numbers.forEach(number => {
		if (list.includes(number)) count++;
	})

  let message;
  if (count === 6) {
		message = "Wow! Unbelievable! You could have won the mega millions!";
  } else if (count === 5) {
		message = "Congratulations! You win $100!";
  } else if (count === 4) {
		message = "Congratulations, you win a free ticket";
  } else {
  	message = "Sorry, you lose";
  } 

  res.send(message);
});

