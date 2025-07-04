---
layout: ../layouts/ReviewLayout.astro
title: About
---

## Why?

The premise for this blog came from the following "tweet":

> I don't think we're ready for the wave of power tool reviews generated with the prompts like:

```
You are Ernest Hemingway, the famous American author and war veteran.
You have just discovered the Black & Decker CT2000 Hedge Trimmer (skin only).
Your task is to leave a review on homedepot.com highlighting your experience with the tool.

Your review should include details such as
- how difficult it was to find a parking spot
- how impressed you were with the relatively little amount of packaging you had to deal with to remove the tool
- the fact that this tool was made in America
- the speed in which you were able to trim the numerous hedges that line your property
- the good ergonomics of the machine

Please write this review in the style that high school students across America have come to recognize as "quintessential Hemingway".
Feel free to compare the concept of masculine identity before and after the tool's acquisition.
```

A friend replied:

> Powerful tool purchased by powerful tool

And that was enough encouragement for me.

I don't endorse the wholesale theft of human output that went into the creation of the models used in this project; however I can't help but chuckle at a juxtaposition that is only possible with the stochastic parrots presaging our economic collapse. Namely, the answer to the question, "what would {insert dead author} have written, if they were offered a $10 amazon gift card for a product review on a website?"

## The Process

This project has no secret sauce. The code is open source -- check it out on [github](https://github.com/stevenpollack/power-tools) -- and the system and meta-prompts are commited to version control and I had the model that generated a given review annotate that review with its model name. I tried to document generating prompts, where reasonable, but nearly 95% of the code was authored in Cursor through the chat panel so some prompting has been lost to the chat history.

The process began with a dialogue with Gemini-2.5-Pro (GP):

- I explained the project goal of generating product reviews in the voices of famous, deceased authors.
- I told GP to assume the (impossible) role of CTO and expert UI/UX designer and to propose a tech stack for the project.
- After some back and forth, it created a document that included a wireframe of the UI and a suggestion to use Astro keep everything server-side rendered.

I then took GP's output and began a dialogue with Claude-4-sonnet (CS):

- I ask CS to assume the same role and critique GP's strategy document and UI wireframe.
- CS eventually agreed with GP's recommendation for Astro, but criticised its UI as boring and failing to allow for "serendipitous browsing".
- It proposed an alternative, pinterest-style masonry grid with some filters, and was then prompted to suggest a starting handful of authors with the conditions:

1. the author's work must be publically available for scraping (ideally from Project Gutenberg)
2. the list cannot be entirely male-dominated
3. Ernest Hemingway and Ayn Rand must be in the initial set

It returned the set of authors available as of July 4, 2025.

I did a bit more prompt refinement and had CS create a prompt _for itself to later consume_ that would be the basis for the generated reviews. The prompt template is [here](https://github.com/stevenpollack/power-tools/blob/main/generate-featured-reviews.js#L169).

Then came the initial scraping of [homedepot.com]. Which I didn't realise geo-blocks IPs outside of the US because my planning with CS had it accessing the product catalogue from its data centre, not from my location. Despite CS successively gathering some product data, future data refinement using puppeteer would end up dead-on-arrival. Long story short, a smattering of popular products on Home Depot's website (as measured by product review count) had their descriptions and features scraped.

A lesson to anyone who's made it this far: these AI agents will lie if it helps them claim "mission accomplished". I had prompted CS to extract thumbnail images for each tool and instead it provided nonsense URLs and then proclaimed its task done. This forced me to upgrade the tech stack to include a [puppeteer MCP server](https://github.com/stevenpollack/mcp-pptr) to have any future web scraping happen through puppeteer.

After a test group of tools, and a small cohort of authors were created, my monthly free Cursor credits ran out, and I had to switch from CS to GP to generate the first 24 reviews. (I challenge the reader to see if they can tell the difference between GP- and CS-generated reviews.)

Cursor (with CS and GP) was used extensively to adjust the code for this blog's UI; however, once that was done, the task of fleshing out the tool selection came up. Since I wasn't interested in paying money to have robots lie to me (again), I tasked GP with using puppeteer to scrape more tool data. That was a big mistake. Where CS had zero difficulties accessing homedepot.com data, GP proclaimed that homedepot.com's "sophisticated anti-scraping measures" made the task near impossible. It exclaimed the same nonsense with [bunnings.com.au].

At this point, I ponied up the cash and used CS directly from the terminal. Quel surprise! CS had no issues executing the excruciatingly detailed plan I made with GP to scrape and parse Bunnings' power tools to even out of selection. Google's got **a lot** of catching up to do.

I had CS scrape Bunnings' product data (including the correct tool images, now), as well as generate all the Author-Tool combinations that weren't already available. You can see the slightly modified review prompt template [here]().

## Feedback

If I missed your favourite powertool or you would like to see your favourite (dead) author take a swing at some of Bunnings more popular power tools, feel free to raise an issue on the [github repo](https://github.com/stevenpollack/power-tools/issues) or [email me](mailto:steep.ship0287@fastmail.com).
