import React from 'react'
      import EmployeeCard from '@/components/molecules/EmployeeCard'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const EmployeeList = ({ employees, onView, onEdit, onDelete, getStatusColor, searchTerm, filterDepartment }) => {
        if (employees.length === 0) {
          return (
            <div className="text-center py-12">
              <Icon name="Users" size={48} className="mx-auto text-surface-300 dark:text-surface-600 mb-4" />
              <Text type="body">
                {searchTerm || filterDepartment !== 'all' ? 'No employees match your search criteria' : 'No employees found'}
              </Text>
            </div>
          )
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        )
      }

      export default EmployeeList