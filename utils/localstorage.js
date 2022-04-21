const getAwakeningData = () => {
  const data =
    typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem('awakening')) ?? {}
      : {}
  return data
}

const setAwakeningField = (field, value) => {
  const baseData = getAwakeningData()
  baseData[field] = value
  window.localStorage.setItem('awakening', JSON.stringify(baseData))
  return baseData
}

export { getAwakeningData, setAwakeningField }
