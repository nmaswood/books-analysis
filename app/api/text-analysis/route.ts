import { NextRequest } from "next/server";
import * as cheerio from 'cheerio';
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { ChatOpenAI } from "@langchain/openai";
import { TokenTextSplitter } from "@langchain/textsplitters";
import { loadSummarizationChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

export async function GET(request: NextRequest) {
    const bookId = request.nextUrl.searchParams.get("id")

    if (!bookId) {
        return Response.json("Book Id is required")
    }
    const data = await fetch(`https://www.gutenberg.org/ebooks/${bookId}`)
    const metaText = await data.text()
    const $ = cheerio.load(metaText);
    const bookContent = $("a[type = 'text/html']").parent().next().text()


    if (!bookContent) {
        return Response.json({ error: "Book content not found" }, { status: 404 });
    }

    try {

        const loader = new CheerioWebBaseLoader(bookContent);

        const docs = await loader.load();

        const splitter = new TokenTextSplitter({
            chunkSize: 25000,
            chunkOverlap: 5000,
        });

        const docsSummary = await splitter.splitDocuments(docs);
        const llmSummary = new ChatOpenAI({
            model: "gpt-4o",
            temperature: 0
        });

        const summaryTemplate = `
        You are an expert in summarizing books.
        Your goal is to create a concise, high-level summary of a book. This summary should help readers understand the main plot, key themes, and central characters without going into excessive detail.

        Below you find the book content:
        --------
        {text}
        --------

        Write a summary that:
        - Introduces the main character(s) and setting briefly.
        - Describes the main events in the book.
        - Avoids insignificant details.

        An example of a good summary:

        Example:
        "Set in a dystopian future, the book follows protagonist John Doe as he navigates a society under constant surveillance. Major themes include freedom vs. control and the power of individual agency. Key events include John’s struggle to break free from societal norms and his ultimate confrontation with the authoritarian system."

        Please summarize the book in a style similar to the example and make sure to not exceed 150 words.

        SUMMARY:
              `;

        const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);

        const summaryRefineTemplate = `
        You are an expert in summarizing books.
        Your goal is to refine and improve an existing book summary with additional context and remove unneeded details, make it more concise.

        We have provided an initial summary up to a certain point: {existing_answer}

        Below you find more text from the book:
        --------
        {text}
        --------

        When refining the summary:
        - Focus on enhancing the clarity and flow of the summary and no matter what do not exceed 150 words.
        - Integrate only the most relevant themes and major plots and events from the new context.
        - Avoid adding minor details or significant plot points.

        If the new context does not add meaningful information, keep the existing summary as it is.
         SUMMARY:
              `;

        const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
            summaryRefineTemplate
        );

        const summarizeChain = loadSummarizationChain(llmSummary, {
            type: "refine",
            verbose: true,
            questionPrompt: SUMMARY_PROMPT,
            refinePrompt: SUMMARY_REFINE_PROMPT,
        });

        const summary = await summarizeChain.run(docsSummary);

        return Response.json({ summary: summary })


    } catch (error: unknown) {
        if (error instanceof Error) {
            return Response.json({ error: `${error.message}` }, { status: 500 });
        } else {
            return Response.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }

}
