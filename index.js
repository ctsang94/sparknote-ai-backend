import express from 'express';
import OpenAI from "openai";
import 'dotenv/config'

const {OPENAI_API_KEY, organization_id} = process.env

const app = express();
const port = 8000;


const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    organization: organization_id
});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You're a technical support engineer that works at https://plaid.com. You are an expert with tool and often refer to these docs to help you trouble shoot customer issues: https://plaid.com/docs/"},
        {
            role: "user",
            content: `How would you solve the following challenges? Challenge 2: A client is reaching out with a question about a particular error.
Hi Plaid Support,
I have a user that is complaining that they cannot link their account to First
National Bank. The error they get back is INVALID_CREDENTIALS. They are
claiming that they are typing in the correct information. Are there any
troubleshooting steps that my user can take?
Thanks,
Ernie Hudson

Challenge 3: A client is reaching out with a question about implementation.
Hi Plaid Support!
We were surprised to find out that Plaid allows a user to link the same Item
multiple times. We’d like to prevent this from happening. Don’t your docs say that
you block this kind of thing? How can we prevent users from linking the same
account multiple times?

Your Friend,
Bill Murray

Challenge 4: A client is reaching out with a question about transactions data.
Hi Plaid,
I’m recently integrated with Plaid and I’m starting to see duplicate transactions pop
up in my database. The pattern seems to be that Plaid returns each transaction
and then returns that same transaction again roughly two days later but under a
new transaction_id. Could you please take a look at let me know what’s going
wrong here? Here is one example of the duplicates I’m seeing:
{
"account_id": "vokyE5Rn6vHKqDLRXEn5fne7LwbKPLIXGK98d",
"amount": 2307.21,
"iso_currency_code": "USD",
"unofficial_currency_code": null,
"category": [
"Shops",
"Computers and Electronics"
],
"category_id": "19013000",
"date": "2017-01-29",
"location": {
"address": "300 Post St",
"city": "San Francisco",
"region": "CA",
"postal_code": "94108",
"country": "US",
"lat": null,
"lon": null
},
"name": "Apple Store",
"payment_meta": Object,
"pending": false,
"Pending_transaction_id":
“lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje”, "account_owner":
null,
"transaction_id": "4WPD9vV5A1cogJwyQ5kVFB3vPEmpXPS3qvjXQ",
"transaction_type": "place"

},
{
"account_id": "vokyE5Rn6vHKqDLRXEn5fne7LwbKPLIXGK98d",
"amount": 2307.21,
"iso_currency_code": "USD",
"unofficial_currency_code": null,
"category": [
"Shops",
"Computers and Electronics"
],
"category_id": "19013000",
"date": "2017-01-27",
"location": {
"address": "300 Post St",
"city": "San Francisco",
"region": "CA",
"postal_code": "94108",
"country": "US",
"lat": null,
"lon": null
},
"name": "Apple Store",
"payment_meta": Object,
"pending": true,
"pending_transaction_id": null,
"account_owner": null,
"transaction_id": "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje",
"transaction_type": "place"
}
Best,
Janine Melnitz

Write it in a format where it's easy to read when you display this in the content json object`,
        },
    ],
});

console.log(completion.choices[0].message);

app.listen(port, ()=>{console.log(`Server is running on ${port}`)})
