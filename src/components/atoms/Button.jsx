import React from 'react'

      const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', title = '' }) => {
        let baseClasses = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'

        switch (variant) {
          case 'primary':
            baseClasses += ' bg-primary hover:bg-primary-dark text-white'
            break
          case 'secondary':
            baseClasses += ' text-primary hover:text-primary-dark border border-primary hover:border-primary-dark'
            break
          case 'ghost':
            baseClasses += ' p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400'
            break
          case 'icon-danger':
            baseClasses += ' p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors'
            break
          case 'icon-neutral':
            baseClasses += ' p-1 hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-colors'
            break
          case 'quick-action':
            baseClasses += ` p-4 rounded-lg border-2 border-dashed transition-colors hover:border-solid`
            break
          case 'dark-mode':
            baseClasses = `p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors`
            break
          case 'notification':
            baseClasses = `relative p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors`
            break
          default:
            break
        }

        return (
          <button type={type} onClick={onClick} className={`${baseClasses} ${className}`} title={title}>
            {children}
          </button>
        )
      }

      export default Button