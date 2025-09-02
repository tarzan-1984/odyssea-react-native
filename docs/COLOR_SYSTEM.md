# 🎨 Color System Documentation

## Overview
Централизованная система цветов для приложения Odyssea, обеспечивающая консистентность дизайна и простоту поддержки.

## 📁 Структура файлов
```
src/lib/
├── colors.ts      # Основная палитра цветов
├── theme.ts       # Полная тема (цвета + типографика + отступы)
└── index.ts       # Экспорт всех утилит
```

## 🎯 Основные цвета

### Primary Colors
```typescript
colors.primary.blue        // #007AFF - Основной синий для кнопок
colors.primary.lightBlue   // #5AC8FA - Светло-синий для профиля
```

### Secondary Colors
```typescript
colors.secondary.green     // #34C759 - Зеленый для success состояний
```

### Neutral Colors
```typescript
colors.neutral.black       // #000000 - Основной текст
colors.neutral.white       // #ffffff - Фон и текст на цветном фоне
colors.neutral.darkGrey    // #8E8E93 - Placeholder текст
colors.neutral.mediumGrey  // #C7C7CC - Неактивные элементы
colors.neutral.lightGrey   // #E0E0E0 - Границы
colors.neutral.veryLightGrey // #F0F0F0 - Неактивные элементы
colors.neutral.mapGrey     // #F5F5F5 - Фон карты
colors.neutral.inputGrey   // #F8F8F8 - Фон полей ввода
```

## 🚀 Использование

### Базовое использование
```typescript
import { colors } from '@/lib/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.blue,
    color: colors.neutral.white,
  },
});
```

### Использование с темой
```typescript
import { colors, typography, spacing, borderRadius, shadows } from '@/lib';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.blue,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    ...typography.button,
    ...shadows.md,
  },
});
```

### Типизация
```typescript
import type { ColorKey, PrimaryColorKey } from '@/lib/colors';

// Автокомплит для цветов
const primaryColor: PrimaryColorKey = 'blue'; // ✅
const invalidColor: PrimaryColorKey = 'red';  // ❌ TypeScript error
```

## 📝 Примеры использования

### Кнопки
```typescript
// Primary button
backgroundColor: colors.primary.blue

// Success button  
backgroundColor: colors.secondary.green

// Disabled button
backgroundColor: colors.neutral.mediumGrey
```

### Текст
```typescript
// Основной текст
color: colors.neutral.black

// Вторичный текст
color: colors.neutral.darkGrey

// Текст на цветном фоне
color: colors.neutral.white
```

### Фоны
```typescript
// Основной фон
backgroundColor: colors.neutral.white

// Фон полей ввода
backgroundColor: colors.neutral.inputGrey

// Фон карты
backgroundColor: colors.neutral.mapGrey
```

## 🔄 Миграция существующего кода

### До (хардкод)
```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    color: '#ffffff',
    borderRadius: 12,
    paddingVertical: 18,
  },
});
```

### После (система цветов)
```typescript
import { colors, spacing, borderRadius } from '@/lib';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.blue,
    color: colors.neutral.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
  },
});
```

## ✅ Преимущества

1. **Консистентность** - Все цвета в одном месте
2. **Типизация** - TypeScript автокомплит и проверка
3. **Легкость изменений** - Изменение цвета в одном месте
4. **Масштабируемость** - Легко добавлять новые цвета
5. **Документированность** - Четкая структура и названия

## 🎨 Соответствие дизайну

Все цвета точно соответствуют предоставленному дизайну:
- ✅ Primary blue (#007AFF) для кнопок и активных состояний
- ✅ Light blue (#5AC8FA) для профиля и вторичных элементов  
- ✅ Green (#34C759) для success состояний
- ✅ Полная серая палитра для текста и границ
- ✅ Белый и черный для основных контрастов

## 🔮 Будущие улучшения

- [ ] Поддержка темной темы
- [ ] Адаптивные цвета для разных размеров экранов
- [ ] Анимации переходов между цветами
- [ ] Интеграция с дизайн-системой
