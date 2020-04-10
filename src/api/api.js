export class Api {
  static checkForError(response) {
    if (!response.ok) throw Error(`Ошибка: ${response.statusText}`)
    return response.json()
  }
  static async fetchCurrenciesData() {
    try {
      const data = fetch(
        'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
      )
        .then((response) => {
          if (!response.ok) throw Error(`Ошибка: ${response.statusText}`)
          return response.json()
        })
        .then((data) => data.Data)
        .catch((e) => {
          console.log('ошибка ', e)
          return []
        })
      return data
    } catch (error) {
      return []
    }
  }
}
