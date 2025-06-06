import React from 'react'

      const Input = ({ type = 'text', placeholder = '', value, onChange, className = '', required = false, icon: IconComponent }) => {
        const baseClasses = 'w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white'
        const inputClasses = IconComponent ? 'pl-10 pr-4 text-sm' : ''

        return (
          <div className="relative">
            {IconComponent && (
              <IconComponent size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            )}
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              className={`${baseClasses} ${inputClasses} ${className}`}
            />
          </div>
        )
      }

      export default Input