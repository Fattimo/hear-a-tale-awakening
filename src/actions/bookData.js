const updateBookData = async (body) => {
  const res = await fetch('/api/book_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return data
}

const getBookData = async () => {
  const res = await fetch('/api/book_data')
  const data = await res.json()
  return data
}

export { updateBookData, getBookData }
