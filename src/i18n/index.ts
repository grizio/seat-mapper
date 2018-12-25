import en from 'i18n/en'
import fr from 'i18n/fr'
import { I18N } from 'i18n/I18N'

export type Language = "en" | "fr"

export default function i18n(key: keyof I18N, language?: Language): string {
  if (!language) {
    console.log(key, language)
  }
  switch (language) {
    case "en":
      return en[key]
    case "fr":
      return fr[key]
    default:
      return en[key]
  }
}