export const mentionSuggestionOptions = {
  items: ({ query }) => {
    return [
      'Axl Rose', 'Slash', 'Duff McKagan', 'Izzy Stradlin'
    ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
  },
};