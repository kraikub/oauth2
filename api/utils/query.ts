export const mapQueryStringToUrl = (base: string, query: { [key: string]: string}): string => {
    let baseString = base + "?"
    const keys = Object.keys(query)
    for (const key of keys) {
        baseString += `${key}=${query[key]}&`
    }
    return baseString
}