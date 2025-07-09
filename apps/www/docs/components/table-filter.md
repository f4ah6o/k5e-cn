---
title: Table Filter
description: Advanced filtering component for kintone record lists
---

# Table Filter

The Table Filter component adds powerful search and filtering capabilities to kintone's record list views.

## Features

- 🔍 **Real-time search** - Filter records as you type
- 🎯 **Multi-keyword search** - Use space-separated keywords
- 💾 **Save filters** - Persist filter state across sessions
- 📊 **Result count** - See how many records match
- 🎨 **kintone styling** - Matches native UI perfectly

## Installation

```bash
pnpm dlx k5e-cn@latest add table-filter
```

## Usage

### Basic Usage

The component automatically initializes on record list pages:

```javascript
// The component is self-initializing
import './components/table-filter.js'
```

### Custom Configuration

```javascript
(() => {
  'use strict'
  
  const filter = new TableFilter({
    // Filter only specific fields
    fields: ['title', 'description', 'status'],
    
    // Save filter state with a custom key
    saveKey: 'my-custom-filter',
    
    // Position of filter UI
    position: 'top', // or 'bottom'
    
    // Custom placeholder text
    placeholder: 'Search records...',
    
    // Debounce delay in milliseconds
    debounceMs: 300
  })
  
  kintone.events.on('app.record.index.show', (event) => {
    return filter.init(event)
  })
})()
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fields` | `string[]` | `undefined` | Field codes to search. If not specified, searches all visible fields |
| `saveKey` | `string` | `undefined` | Key for localStorage to persist filter state |
| `position` | `'top' \| 'bottom'` | `'top'` | Position of the filter UI relative to the table |
| `placeholder` | `string` | `'フィルター検索...'` | Placeholder text for the search input |
| `debounceMs` | `number` | `300` | Debounce delay for search input |

## Examples

### Filter Specific Fields Only

```javascript
const filter = new TableFilter({
  fields: ['customer_name', 'product_code', 'status'],
  placeholder: 'Search customers, products, or status...'
})
```

### Multiple Filters on Same Page

```javascript
// Main filter
const mainFilter = new TableFilter({
  saveKey: 'main-filter',
  position: 'top'
})

// Status filter
const statusFilter = new TableFilter({
  fields: ['status'],
  saveKey: 'status-filter',
  position: 'bottom',
  placeholder: 'Filter by status...'
})
```

### Integration with Other Components

```javascript
import './components/table-filter.js'
import './components/bulk-update.js'

// Both components work together seamlessly
// Bulk update will only affect filtered records
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The component respects kintone's view permissions
- Filtering is performed client-side on visible records
- Large datasets (>1000 records) may experience slight lag
- Filter state is stored per app ID when using `saveKey`

## Customization

Since you own the code, you can customize the component:

### Change Styling

```javascript
// In table-filter.ts
this.filterContainer.style.cssText = `
  padding: 20px;
  background-color: #f0f0f0;
  border: 2px solid #0066cc;
  border-radius: 8px;
  margin-bottom: 20px;
`
```

### Add Export Button

```javascript
// Add export button next to clear button
const exportButton = document.createElement('button')
exportButton.textContent = 'Export Filtered'
exportButton.className = 'kintoneplugin-button-normal'
exportButton.onclick = () => this.exportFiltered()

wrapper.appendChild(exportButton)
```

## Troubleshooting

### Filter not appearing

Make sure you're on a record list view:
```javascript
if (kintone.app.getViewId() !== null) {
  // Initialize filter
}
```

### Performance issues

For large datasets, consider:
- Increasing `debounceMs` value
- Limiting searchable fields with `fields` option
- Implementing server-side filtering