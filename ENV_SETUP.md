# Environment Setup Instructions

## Проблема
При попытке входа в приложение возникает ошибка "Network request failed" из-за неправильной настройки переменных окружения.

## Решение

### 1. Создайте файл .env в корне проекта

Создайте файл `.env` в корневой директории проекта со следующим содержимым:

```env
# API Configuration
API_BASE_URL="https://odyssea-backend-nestjs.onrender.com"
```

**Важно**: 
- Переменная должна называться именно `API_BASE_URL` 
- URL должен быть в кавычках
- Не должно быть пробелов вокруг знака `=`

### 2. Перезапуск приложения

После создания файла `.env`:
1. Остановите Expo сервер (Ctrl+C)
2. Запустите заново с очисткой кэша: `expo start --clear`
3. Выберите "i" для iOS симулятора

## Как это работает

### Архитектура загрузки переменных окружения:

1. **`src/lib/config.ts`** - централизованная конфигурация
2. **`react-native-dotenv`** - загружает переменные из `.env` файла
3. **`babel.config.js`** - настройки для работы с `@env` модулем
4. **Fallback логика** - если `.env` не работает, используется `localhost:3000`

### Последовательность загрузки:

1. **Попытка 1**: Загрузить из `@env` модуля (из `.env` файла)
2. **Попытка 2**: Загрузить из `process.env`
3. **Попытка 3**: Использовать fallback для разработки

## Проверка

После настройки в консоли должно появиться:

```
env: load .env
env: export API_BASE_URL
LOG Loaded API_BASE_URL from @env: https://odyssea-backend-nestjs.onrender.com
LOG Using configured API_BASE_URL: https://odyssea-backend-nestjs.onrender.com
LOG App configuration loaded:
LOG API_BASE_URL: https://odyssea-backend-nestjs.onrender.com
```

## Устранение неполадок

### Если переменная не загружается:

1. **Проверьте имя переменной** - должно быть `API_BASE_URL`
2. **Проверьте формат** - `API_BASE_URL="https://your-url.com"`
3. **Перезапустите с очисткой кэша** - `expo start --clear`
4. **Проверьте расположение** - файл `.env` должен быть в корне проекта

### Если все еще не работает:

1. Убедитесь, что `react-native-dotenv` установлен: `npm list react-native-dotenv`
2. Проверьте настройки в `babel.config.js`
3. Попробуйте удалить `node_modules` и переустановить: `rm -rf node_modules && npm install`

## Дополнительные настройки

### Для разных окружений:

```env
# Development
API_BASE_URL="http://localhost:3000"

# Staging  
API_BASE_URL="https://staging-api.odyssea.com"

# Production
API_BASE_URL="https://odyssea-backend-nestjs.onrender.com"
```

### iOS настройки:

В `app.json` уже настроены разрешения для HTTPS запросов к внешним серверам.
