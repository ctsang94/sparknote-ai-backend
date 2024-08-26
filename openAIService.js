import OpenAI from 'openai'
import 'dotenv/config'

const { OPENAI_API_KEY, organization_id } = process.env

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    organization: organization_id,
})

export const generateBookSummary = async (bookDetails) => {
    try {
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
            organization: organization_id,
        })

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Pretend like your sparknotes.com' },
                {
                    role: 'user',
                    content:
                        'Give me an overview summary, characters, antagonist, protagonist, theme of the book catcher in the rye',
                },
            ],
        })

        return completion.choices[0].message
    } catch (error) {
        console.log(error)
    }
}
