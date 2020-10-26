const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const shouldFail = false;

let ticketNo = 0;
let data = fs.readFileSync('data', {encoding: 'utf8'});

if (data) {
	ticketNo = parseInt(data);
}

app.use(express.json());

app.post('*', (request, response) => {
	const transactionType = request.body.u_transaction_type;

	console.log('RECV ---------------------------------');
	console.log(request.body);
	console.log('--------------------------------------');

	if (!shouldFail) {
		if (transactionType === "NEW") {
			ticketNo++;
			fs.writeFileSync('data', `${ticketNo}`);

			response.json({
				result: [
					{
						display_value: `QAINC${ticketNo}`
					}
				]
			});
		}
		else {
			response.send('');
		}
	}
	else {
		response.status(400);
		response.json({test: 'failed'});
	}
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
