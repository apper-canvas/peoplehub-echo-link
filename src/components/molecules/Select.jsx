import React from 'react'

      const Select = ({ children, value, onChange, className = '', id, name }) => {
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`px-3 py-2 text-sm border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white ${className}`}
          >
            {children}
          </select>
        )
      }

      export default Select