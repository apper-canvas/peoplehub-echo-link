import React from 'react'

      const Heading = ({ level, children, className = '' }) => {
        const baseClasses = 'font-heading font-semibold text-surface-900 dark:text-white'
        let Tag

        switch (level) {
          case 1:
            Tag = 'h1'
            // For h1, we often use 'font-bold' as in the original app
            return <h1 className={`text-3xl font-bold ${className} ${baseClasses.replace('font-semibold', '')}`}>{children}</h1>
          case 2:
            Tag = 'h2'
            break
          case 3:
            Tag = 'h3'
            // Specific styles from MainFeature for h3
            return <h3 className={`text-lg ${className} ${baseClasses}`}>{children}</h3>
          case 4:
            Tag = 'h4'
            // Specific styles from MainFeature for h4
            return <h4 className={`font-medium text-surface-900 dark:text-white truncate ${className}`}>{children}</h4>
          default:
            Tag = 'p' // Fallback to p if level is not specified or invalid
            break
        }

        return <Tag className={`${baseClasses} ${className}`}>{children}</Tag>
      }

      export default Heading