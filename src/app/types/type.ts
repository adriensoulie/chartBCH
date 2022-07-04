  
export type ChartOrdered = {
    date: string,
    value: number
}

export type News = {
    excerpt: string,
    href: string,
    publish_date: string,
    thumbnail: string,
    title: string,
}
  
export type ChartRaw = [time: string, price: number]