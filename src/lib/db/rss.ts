import { XMLParser } from 'fast-xml-parser';

import * as z from "zod";

export const RSSItemSchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string(),
  pubDate: z.string(),
})

export const RSSFeedSchema = z.object({
  channel: z.object({
    title: z.string(),
    link: z.string(),
    description: z.string(),
    item: z.array(RSSItemSchema.optional())
  })
})

export type RSSFeed = z.infer<typeof RSSFeedSchema>
export type RSSItem = z.infer<typeof RSSItemSchema>

export async function fetchFeed(feedURL: string) {
  const response = await fetch(feedURL, {
    headers: {
      "User-Agent": 'gator'
    }
  })

  const raw = await response.text()

  const parser = new XMLParser({
    processEntities: false
  })

  const parsedRSSFeed = parser.parse(raw)

  const data = RSSFeedSchema.parse(parsedRSSFeed.rss)
  if (data) {
    const {title, link, description, item} = data.channel

    let items: RSSItem[] = []
    if (Array.isArray(item)) {
      items = item.filter((el) => el !== undefined)
    }

    items.filter(el => {
      return RSSItemSchema.parse(el)
    })

    return {
      title, link, description, items
    }

  } else {
    throw Error('Wrong rss feed object')
  }

}