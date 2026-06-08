# Dictionary App — Endpoints & Pages Reference

## External API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | https://api.dictionaryapi.dev/api/v2/entries/en/{word} | Fetch full dictionary entry for a word |

## Response Shape (summary)
Document the key fields used from the API response:
- `word` (string)
- `phonetics[]` → `text` (string), `audio` (string URL)
- `meanings[]` → `partOfSpeech` (string), `definitions[]` → `definition` (string), `example` (string)

## App Screens / Pages
| Screen | File | Description |
|--------|------|-------------|
| Search Screen | /src/screens/SearchScreen.js | Main entry point. Search input, recent chips, empty/error/loading states |
| Word Detail Screen | /src/screens/WordDetailScreen.js | Full word info: header, phonetics, audio, meanings, definitions, examples |
| History Screen | /src/screens/HistoryScreen.js | Search history list (opened from menu on Search screen) |

## Navigation Structure
Document the navigator hierarchy:
- StackNavigator (root)
  - SearchScreen (initial route)
  - WordDetailScreen
  - HistoryScreen

## Local Storage Keys
| Key | Type | Description |
|-----|------|-------------|
| @lexi_history | JSON Array | Stores list of previously searched words (strings) |
