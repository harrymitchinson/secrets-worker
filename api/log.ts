export function logger(name: string, context?: {}) {
  return {
    debug: (msg, ctx) => console.debug({
      ...context,
      ...ctx,
      logger: name,
      msg: msg
    }),
    info: (msg, ctx) => console.log({
      ...context,
      ...ctx,
      logger: name,
      msg: msg
    }),
    error: (msg, error, ctx) => console.error({
      ...context,
      ...ctx,
      logger: name,
      msg: msg,
      error: error?.message
    })
  } as Logger
}

interface Logger {
  debug: (msg: string, context?: {}) => void
  info: (msg: string, context?: {}) => void
  error: (msg: string, error?: Error, context?: {}) => void
}

export function extractRequest(request: Request) {
  const { cf, url, method } = request
  const u = new URL(url)

  const { city, region, country, colo } = cf
  return {
    method,
    url,
    path: u.pathname,
    query: u.search,
    cf_city: city,
    cf_region: region,
    cf_country: country,
    cf_colo: colo,
  }
}