import type { Cheerio } from 'cheerio'

export const textParse = (el: Cheerio<any>) => el.text().trim().replaceAll(/\xA0/g, ' ')
export const numberParse = (el: Cheerio<any>) => parseInt(el.text().trim() || '1') || 1
