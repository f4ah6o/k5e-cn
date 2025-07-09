---
title: Quick Start
description: Get up and running with @k5e/cn in 5 minutes
---

# Quick Start

This guide will walk you through creating your first kintone customization with @k5e/cn.

## Step 1: Create a New Project

```bash
pnpm dlx k5e-cn@latest init my-kintone-app
```

Follow the prompts:
- Project name: `my-kintone-app`
- TypeScript: Yes (recommended)

## Step 2: Navigate to Your Project

```bash
cd my-kintone-app
pnpm install
```

## Step 3: Add Your First Component

Let's add a table filter to enhance the record list view:

```bash
pnpm dlx k5e-cn@latest add table-filter
```

## Step 4: Import the Component

Open `src/index.ts` and add:

```typescript
import './components/table-filter.js'

(() => {
  'use strict'

  console.log('kintone customization loaded')
  
  // The table-filter component auto-initializes
  // No additional code needed!
})()
```

## Step 5: Build Your Project

```bash
pnpm build
```

This creates `dist/bundle.js` - your complete customization file.

## Step 6: Deploy to kintone

1. Log in to your kintone environment
2. Open the app you want to customize
3. Go to App Settings → JavaScript and CSS Customization
4. Upload `dist/bundle.js`
5. Save the settings

## Step 7: Test Your Customization

1. Navigate to the record list view of your app
2. You should see a search box above the table
3. Try filtering records by typing in the search box

🎉 Congratulations! You've successfully added your first @k5e/cn component.

## What's Next?

### Add More Components

Enhance your app with additional components:

```bash
# Form validation
pnpm dlx k5e-cn@latest add form-validator

# Conditional fields
pnpm dlx k5e-cn@latest add conditional-fields

# Bulk updates
pnpm dlx k5e-cn@latest add bulk-update
```

### Customize Components

Since you own the code, you can modify components to fit your needs:

```javascript
// src/components/table-filter.js
// Change the placeholder text
placeholder: 'Search records...' // was 'フィルター検索...'

// Change the position
position: 'bottom' // was 'top'

// Add custom styling
this.filterContainer.style.backgroundColor = '#f0f8ff'
```

### Development Workflow

For faster development:

```bash
# Start development server with auto-reload
pnpm dev

# In another terminal, watch for changes
# and manually upload to kintone when ready
```

## Example: Complete Customization

Here's a complete example with multiple components:

```typescript
// src/index.ts
import './components/table-filter.js'
import './components/form-validator.js'
import './components/conditional-fields.js'

(() => {
  'use strict'

  // Custom configuration for form validator
  kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
    // Add custom validation rules
    const validator = new FormValidator({
      rules: {
        email: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address'
        },
        phone: {
          required: true,
          pattern: /^\d{3}-\d{4}-\d{4}$/,
          message: 'Please enter phone number as 000-0000-0000'
        }
      }
    })
    
    return event
  })
})()
```

## Tips for Success

1. **Start Small**: Add one component at a time
2. **Test Often**: Build and test after each change
3. **Use TypeScript**: Get better IDE support and catch errors early
4. **Check Console**: Browser DevTools console shows helpful errors
5. **Read the Docs**: Each component has detailed documentation

## Common Patterns

### Conditional Logic

```javascript
// Only initialize on specific views
if (kintone.app.getViewId() === 1234) {
  // Component initialization
}
```

### Multiple Apps

```javascript
// Different components for different apps
const appId = kintone.app.getId()

switch (appId) {
  case 10:
    import('./components/table-filter.js')
    break
  case 20:
    import('./components/form-validator.js')
    break
}
```

### Environment Detection

```javascript
// Different behavior for different environments
const domain = location.hostname

if (domain.includes('cybozu.com')) {
  // Production settings
} else {
  // Development settings
}
```

## Need Help?

- Check component documentation for detailed usage
- Look at the [GitHub repository](https://github.com/f4ah6o/k5e-cn) for examples
- Open an issue if you find bugs or have questions