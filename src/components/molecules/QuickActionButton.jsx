import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const QuickActionButton = ({ name, icon, color }) => {
        const colorClasses = {
          blue: 'border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600',
          green: 'border-green-300 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600',
          purple: 'border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600',
          orange: 'border-orange-300 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600'
        }

        return (
          <Button variant="quick-action" className={colorClasses[color]}>
            <Icon name={icon} size={24} className={`mx-auto mb-2 ${colorClasses[color]}`} />
            <Text type="normal" className="font-medium">{name}</Text>
          </Button>
        )
      }

      export default QuickActionButton