import React from 'react'

      const Badge = ({ children, color, className = '' }) => {
        const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
        let colorClasses = ''

        switch (color) {
          case 'green':
            colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            break
          case 'red':
            colorClasses = 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            break
          case 'yellow':
            colorClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            break
          default:
            colorClasses = 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
            break
        }

        return <span className={`${baseClasses} ${colorClasses} ${className}`}>{children}</span>
      }

      export default Badge