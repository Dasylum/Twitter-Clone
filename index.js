var express = require('express');
var app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());
var monk = require('monk');

var db = monk('localhost/mewer');
var mews = db.get('mews');

app.get('/', (req,res) => {
	res.json({
		
	})
});

function isValidMew(mew) {
	return mew.name && mew.name.toString().trim() !== '' &&
		   mew.content && mew.content.toString().trim() !=='';
}


app.get('/mews', (req, res) => {
	mews.find()
	.then(mews => {
		res.json(mews);
	})
});


app.post('/mews', (req, res) => {
	if(isValidMew(req.body)) {
		//insert into db
		const mew = {
			name: req.body.name.toString(), 
			content: req.body.content.toString(),
			created: new Date()
		};
		mews
		   .insert(mew)
		   .then(createdMew => {
		   	res.json(createdMew);
		   });
	}
	else {
		res.status(422);
		res.json({
			message: 'Hey! name and content are required'
		})
	}
});


app.listen(6000, () => {
	console.log("server running on port 5000");
})