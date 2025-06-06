import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const ActivityItem = ({ type, message, time }) => {
        let iconName
        let iconColorClass
        let bgColorClass

        switch (type) {
          case 'leave':
            iconName = 'Calendar'
            iconColorClass = 'text-yellow-600 dark:text-yellow-400'
            bgColorClass = 'bg-yellow-100 dark:bg-yellow-900/20'
            break
          case 'review':
            iconName = 'Star'
            iconColorClass = 'text-green-600 dark:text-green-400'
            bgColorClass = 'bg-green-100 dark:bg-green-900/20'
            break
          case 'employee':
            iconName = 'User'
            iconColorClass = 'text-blue-600 dark:text-blue-400'
            bgColorClass = 'bg-blue-100 dark:bg-blue-900/20'
            break
          default:
            iconName = 'Info'
            iconColorClass = 'text-surface-600 dark:text-surface-400'
            bgColorClass = 'bg-surface-100 dark:bg-surface-900/20'
            break
        }

        return (
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${bgColorClass}`}>
              <Icon name={iconName} size={16} className={iconColorClass} />
            </div>
            <div className="flex-1 min-w-0">
              <Text type="normal">{message}</Text>
              <Text type="small" className="mt-1">{time}</Text>
            </div>
          </div>
        )
      }

      export default ActivityItem