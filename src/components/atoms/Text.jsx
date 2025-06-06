import React from 'react'

      const Text = ({ children, className = '', type = 'body' }) => {
        let baseClasses = ''

        switch (type) {
          case 'body':
            baseClasses = 'text-surface-600 dark:text-surface-400'
            break
          case 'label':
            baseClasses = 'text-sm font-medium text-surface-600 dark:text-surface-400'
            break
          case 'value':
            baseClasses = 'text-surface-900 dark:text-white'
            break
          case 'small':
            baseClasses = 'text-xs text-surface-500 dark:text-surface-500'
            break
          case 'normal':
            baseClasses = 'text-sm text-surface-900 dark:text-white'
            break
          default:
            break
        }

        return <p className={`${baseClasses} ${className}`}>{children}</p>
      }

      export default Text