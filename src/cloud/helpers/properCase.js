const properCase = (string) => string.split(' ').map((lower) => lower.replace(/^\w/, c => c.toUpperCase())).join(' ')

module.exports = properCase
