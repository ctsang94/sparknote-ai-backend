import express from 'express'
import OpenAI from 'openai'
import 'dotenv/config'
import axios from 'axios'

const { OPENAI_API_KEY, organization_id, Google_API_Key } = process.env

const app = express()
const port = 8000

app.use(express.json())

app.get('/books', async (req, res) => {
    const { query } = req.query

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' })
    }
    try {
        const apiKey = Google_API_Key
        console.log(query)
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
        )
        console.log(response)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
