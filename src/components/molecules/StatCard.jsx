import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const StatCard = ({ name, value, change, changeType, icon, delay }) => {
        const getIconBgColor = (iconName) => {
          switch (iconName) {
            case 'Users':
              return 'bg-blue-100 dark:bg-blue-900/20'
            case 'Calendar':
              return 'bg-yellow-100 dark:bg-yellow-900/20'
            case 'TrendingUp':
              return 'bg-green-100 dark:bg-green-900/20'
            case 'Building2':
              return 'bg-purple-100 dark:bg-purple-900/20'
            default:
              return 'bg-surface-100 dark:bg-surface-900/20'
          }
        }

        const getIconColor = (iconName) => {
          switch (iconName) {
            case 'Users':
              return 'text-blue-600 dark:text-blue-400'
            case 'Calendar':
              return 'text-yellow-600 dark:text-yellow-400'
            case 'TrendingUp':
              return 'text-green-600 dark:text-green-400'
            case 'Building2':
              return 'text-purple-600 dark:text-purple-400'
            default:
              return 'text-surface-600 dark:text-surface-400'
          }
        }

        const getChangeColor = (type) => {
          switch (type) {
            case 'increase':
              return 'text-green-600 dark:text-green-400'
            case 'decrease':
              return 'text-red-600 dark:text-red-400'
            default:
              return 'text-surface-600 dark:text-surface-400'
          }
        }

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <Text type="label">{name}</Text>
                <Text type="value" className="text-2xl font-bold mt-1">{value}</Text>
              </div>
              <div className={`p-3 rounded-lg ${getIconBgColor(icon)}`}>
                <Icon name={icon} size={24} className={getIconColor(icon)} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Text type="label" className={`font-medium ${getChangeColor(changeType)}`}>
                {change}
              </Text>
              <Text type="small" className="ml-2">from last month</Text>
            </div>
          </motion.div>
        )
      }

      export default StatCard