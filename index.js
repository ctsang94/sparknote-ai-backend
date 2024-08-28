import express from 'express'
import OpenAI from 'openai'
import 'dotenv/config'
import axios from 'axios'
import cors from 'cors'
import { generateBookSummary } from './openAIService.js'

const { OPENAI_API_KEY, organization_id, Google_API_Key } = process.env

const corsOptions = {
    origin: '*', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Origin',
        'X-Requested-With',
        'Accept',
        'x-client-key',
        'x-client-token',
        'x-client-secret',
        'Authorization',
    ],
    credentials: true,
}

const app = express()
app.use(cors(corsOptions))
const port = 8000

app.use(express.json())

app.get('/books', async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' })
    }
    try {
        const apiKey = Google_API_Key
        const startIndex = (page - 1) * limit
        const maxResults = Number(limit)

        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&startIndex=${startIndex}&maxResults=${maxResults}`
        )

        const books = response.data.items.map((book) => {
            const volumeInfo = book.volumeInfo
            return {
                title: volumeInfo.title,
                authors: volumeInfo.authors,
                publishedDate: volumeInfo.publishedDate,
                thumbnail: volumeInfo.imageLinks?.thumbnail,
                description: volumeInfo.description,
            }
        })

        res.json({
            totalItems: response.data.totalItems,
            currentPage: Number(page),
            totalPages: Math.ceil(response.data.totalItems / limit),
            books: response.data,
        })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

app.post('/openaiservice', async (req, res) => {
    try {
        const bookDetails = req.body

        const aiResponse = await generateBookSummary(bookDetails)

        res.json({ aiContent: aiResponse })
    } catch (error) {
        console.log('Error getting book summary: ', error)
        res.status(500).json({ error: 'Failed to generate book sumary' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
