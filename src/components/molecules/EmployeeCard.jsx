import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Heading from '@/components/atoms/Heading'
      import Text from '@/components/atoms/Text'
      import ProfileAvatar from '@/components/atoms/ProfileAvatar'
      import Button from '@/components/atoms/Button'
      import Badge from '@/components/atoms/Badge'

      const EmployeeCard = ({ employee, onView, onEdit, onDelete, getStatusColor }) => {
        return (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-4 border border-surface-200 dark:border-surface-600 rounded-lg hover:shadow-soft transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <ProfileAvatar initial={employee.name?.charAt(0) || 'N'} />
                <div className="min-w-0 flex-1">
                  <Heading level={4}>{employee.name || 'Unknown'}</Heading>
                  <Text type="body" className="truncate">{employee.position || 'No position'}</Text>
                  <Text type="small">{employee.department || 'No department'}</Text>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge color={getStatusColor(employee.status)}>{employee.status || 'Unknown'}</Badge>

                <div className="flex space-x-1">
                  <Button onClick={() => onView(employee)} variant="icon-neutral" title="View details">
                    <Icon name="Eye" size={14} className="text-surface-600 dark:text-surface-400" />
                  </Button>
                  <Button onClick={() => onEdit(employee)} variant="icon-neutral" title="Edit employee">
                    <Icon name="Edit" size={14} className="text-surface-600 dark:text-surface-400" />
                  </Button>
                  <Button onClick={() => onDelete(employee.id)} variant="icon-danger" title="Delete employee">
                    <Icon name="Trash2" size={14} className="text-red-600 dark:text-red-400" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )
      }

      export default EmployeeCard