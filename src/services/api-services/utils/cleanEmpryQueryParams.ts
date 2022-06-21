export const cleanEmptyQueryParams = (query:any) => {
  const cleanedQuery:any = {}
  Object.keys(query).map(key => {
    cleanedQuery[key] = query[key] || undefined
  })

  return cleanedQuery
}
