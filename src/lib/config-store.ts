import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import configDataInitial from '@/data/configDataInitial.json'
import dictionaries from '@/data/dictionaries.json'
import { ConfigData, Dictionary } from '@/types/type-config-data'

const {
  lastUpdated,
  lang,
  userData,
  validPeriod,
  config,
  colors,
  images,
  links,
  categories,
} = configDataInitial

export type UserData = ConfigData['userData']
type CategoryImage = {
  id: number
  name: string
  image: string
}

export type Lang = ConfigData['lang']

const categoriesImages: CategoryImage[] = categories.map((category) => ({
  id: category.id,
  name: category.name,
  image: category.imgURL,
}))

interface ConfigState {
  lastUpdated: string
  lang: Lang | ''
  user: UserData
  validPeriod: ConfigData['validPeriod']
  config: ConfigData['config']
  colors: ConfigData['colors']
  images: ConfigData['images']
  links: ConfigData['links']
  dictionary: Dictionary
  categories: ConfigData['categories']
  categoriesImages: CategoryImage[]
  soundActive: boolean
  dataEndpoint: { gameHash: string | null; userHash: string | null }
  setLang: (lang: string) => void
  setUserData: (user: UserData) => void
  updateConfigData: (data: Partial<ConfigData>) => void
  setSoundActive: (active: boolean) => void
  updateDataEndpoint: (data: {
    gameHash: string | null
    userHash: string | null
  }) => void
  initializeStore: ({
    gameHash,
    userHash,
  }: {
    gameHash: string | null
    userHash: string | null
  }) => void
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      lastUpdated,
      lang: '',
      user: userData,
      validPeriod,
      config,
      colors,
      images,
      links,
      dictionary: dictionaries[lang as Lang] as Dictionary,
      categories,
      categoriesImages,
      soundActive: false,
      dataEndpoint: { gameHash: null, userHash: null },
      setLang: (lang: string) =>
        set({
          lang: lang as Lang,
          dictionary: dictionaries[lang as Lang] as Dictionary,
        }),
      setUserData: (user) => set({ user }),
      updateConfigData: (data) => set({ ...data, lang: lang as Lang }),
      setSoundActive: (active) => set({ soundActive: active }),
      updateDataEndpoint: (data) => set({ dataEndpoint: data }),
      initializeStore: ({ gameHash, userHash }) => {
        // Actualizar el gameHash en el dataEndpoint
        set({ dataEndpoint: { gameHash, userHash: userHash } })
      },
    }),
    {
      // name: 'config-data-trivia-v3-default',
      name: `config-data-trivia-v3-${getLastUniqueHash() || 'default'}`,
    }
  )
)

function getLastUniqueHash() {
  return localStorage.getItem('lastUniqueHash')
}

useConfigStore.persist.setOptions({
  name: `config-data-trivia-v3-${getLastUniqueHash() || 'default'}`,
})
useConfigStore.persist.rehydrate()
