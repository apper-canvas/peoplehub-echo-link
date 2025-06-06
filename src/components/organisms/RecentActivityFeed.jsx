import React from 'react'
      import { motion } from 'framer-motion'
      import Heading from '@/components/atoms/Heading'
      import Icon from '@/components/atoms/Icon'
      import ActivityItem from '@/components/molecules/ActivityItem'
      import Button from '@/components/atoms/Button'

      const RecentActivityFeed = ({ activities }) => {
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between mb-6">
              <Heading level={3}>Recent Activity</Heading>
              <Icon name="Activity" size={20} className="text-surface-400" />
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} type={activity.type} message={activity.message} time={activity.time} />
              ))}
            </div>

            <Button variant="secondary" className="w-full mt-6">
              View All Activities
            </Button>
          </motion.div>
        )
      }

      export default RecentActivityFeed