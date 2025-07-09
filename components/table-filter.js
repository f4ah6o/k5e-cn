;(() => {
  const defaultConfig = {
    position: 'top',
    placeholder: 'フィルター検索...',
    debounceMs: 300,
  }
  class TableFilter {
    config
    filterInput = null
    filterContainer = null
    originalRows = []
    debounceTimer = null
    constructor(config = {}) {
      this.config = { ...defaultConfig, ...config }
    }
    init(event) {
      if (!this.isIndexPage()) return event
      const table = this.getTable()
      if (!table) return event
      this.createFilterUI(table)
      this.setupEventListeners(table)
      this.loadSavedFilter()
      return event
    }
    isIndexPage() {
      return kintone.app.getViewId() !== null
    }
    getTable() {
      return document.querySelector('.recordlist-gaia')
    }
    createFilterUI(table) {
      this.filterContainer = document.createElement('div')
      this.filterContainer.className = 'k5e-table-filter-container'
      this.filterContainer.style.cssText = `
        padding: 16px;
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        margin-bottom: 16px;
      `
      const wrapper = document.createElement('div')
      wrapper.style.cssText = `
        display: flex;
        gap: 8px;
        align-items: center;
        max-width: 600px;
      `
      this.filterInput = document.createElement('input')
      this.filterInput.type = 'text'
      this.filterInput.placeholder = this.config.placeholder
      this.filterInput.className = 'kintoneplugin-input-text'
      this.filterInput.style.cssText = 'flex: 1;'
      const clearButton = document.createElement('button')
      clearButton.textContent = 'クリア'
      clearButton.className = 'kintoneplugin-button-normal'
      clearButton.onclick = () => this.clearFilter()
      wrapper.appendChild(this.filterInput)
      wrapper.appendChild(clearButton)
      this.filterContainer.appendChild(wrapper)
      const tableParent = table.parentElement
      if (tableParent) {
        if (this.config.position === 'top') {
          tableParent.insertBefore(this.filterContainer, table)
        } else {
          tableParent.appendChild(this.filterContainer)
        }
      }
    }
    setupEventListeners(table) {
      if (!this.filterInput) return
      this.filterInput.addEventListener('input', (e) => {
        const value = e.target.value
        this.debounceFilter(value, table)
      })
      // Store original rows
      const tbody = table.querySelector('tbody')
      if (tbody) {
        this.originalRows = Array.from(tbody.querySelectorAll('tr'))
      }
    }
    debounceFilter(value, table) {
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer)
      }
      this.debounceTimer = window.setTimeout(() => {
        this.applyFilter(value, table)
        this.saveFilter(value)
      }, this.config.debounceMs)
    }
    applyFilter(filterValue, table) {
      const tbody = table.querySelector('tbody')
      if (!tbody) return
      const searchTerms = filterValue.toLowerCase().trim().split(/\s+/)
      for (const row of this.originalRows) {
        const rowText = this.getRowText(row).toLowerCase()
        const matches = searchTerms.every((term) => rowText.includes(term))
        if (matches || filterValue === '') {
          row.style.display = ''
        } else {
          row.style.display = 'none'
        }
      }
      this.updateResultsCount(filterValue)
    }
    getRowText(row) {
      if (!this.config.fields || this.config.fields.length === 0) {
        return row.textContent || ''
      }
      const texts = []
      const cells = row.querySelectorAll('td')
      cells.forEach((cell, index) => {
        const header = document.querySelector(
          `.recordlist-header-cell-gaia:nth-child(${index + 1})`
        )
        const fieldCode = header?.getAttribute('data-field-code')
        if (fieldCode && this.config.fields?.includes(fieldCode)) {
          texts.push(cell.textContent || '')
        }
      })
      return texts.join(' ')
    }
    updateResultsCount(filterValue) {
      const visibleCount = this.originalRows.filter((row) => row.style.display !== 'none').length
      const totalCount = this.originalRows.length
      let countElement = this.filterContainer?.querySelector('.k5e-filter-count')
      if (!countElement) {
        countElement = document.createElement('div')
        countElement.className = 'k5e-filter-count'
        countElement.style.cssText = 'margin-top: 8px; color: #666; font-size: 12px;'
        this.filterContainer?.appendChild(countElement)
      }
      if (filterValue) {
        countElement.textContent = `${visibleCount} / ${totalCount} 件を表示`
      } else {
        countElement.textContent = ''
      }
    }
    clearFilter() {
      if (this.filterInput) {
        this.filterInput.value = ''
        this.filterInput.dispatchEvent(new Event('input'))
      }
    }
    saveFilter(value) {
      if (!this.config.saveKey) return
      const key = `k5e-filter-${kintone.app.getId()}-${this.config.saveKey}`
      if (value) {
        localStorage.setItem(key, value)
      } else {
        localStorage.removeItem(key)
      }
    }
    loadSavedFilter() {
      if (!this.config.saveKey || !this.filterInput) return
      const key = `k5e-filter-${kintone.app.getId()}-${this.config.saveKey}`
      const savedValue = localStorage.getItem(key)
      if (savedValue) {
        this.filterInput.value = savedValue
        this.filterInput.dispatchEvent(new Event('input'))
      }
    }
  }
  // Auto-register with default config
  const filter = new TableFilter({
    saveKey: 'default',
    position: 'top',
  })
  kintone.events.on('app.record.index.show', (event) => filter.init(event))
})()
//# sourceMappingURL=table-filter.js.map
