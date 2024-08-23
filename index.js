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
        { role: "system", content: "Pretend like your sparknotes.com"},
        {
            role: "user",
            content: "Give me an overview summary, characters, antagonist, protagonist, theme of the book catcher in the rye" },
    ],
});

console.log(completion.choices[0].message);

app.listen(port, ()=>{console.log(`Server is running on ${port}`)})
