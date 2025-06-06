import React from 'react'
      import { motion } from 'framer-motion'
      import Heading from '@/components/atoms/Heading'
      import QuickActionButton from '@/components/molecules/QuickActionButton'

      const quickActionsData = [
        { name: 'Add Employee', icon: 'UserPlus', color: 'blue' },
        { name: 'Approve Leaves', icon: 'CheckCircle', color: 'green' },
        { name: 'Schedule Review', icon: 'Calendar', color: 'purple' },
        { name: 'Generate Report', icon: 'FileText', color: 'orange' }
      ]

      const QuickActionsSection = () => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <Heading level={3} className="mb-6">Quick Actions</Heading>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActionsData.map((action) => (
                <QuickActionButton key={action.name} {...action} />
              ))}
            </div>
          </motion.div>
        )
      }

      export default QuickActionsSection