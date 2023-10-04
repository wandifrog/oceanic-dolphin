type AppAction =
| { type: 'CHANGE_THEME' }
| { type: 'CHANGE_LANGUAGE' }
| { type: 'UPDATE_FISH_LIST', data: Fish[] }
| { type: string, data: any }

type AppDispatch = (action: AppAction) => void

type AppState = {
  darkMode: boolean
  language: 'id' | 'en'
  fishList: Fish[]
}
