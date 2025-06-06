import React from 'react'
      import Heading from '@/components/atoms/Heading'
      import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      import ProfileAvatar from '@/components/atoms/ProfileAvatar'
      import Text from '@/components/atoms/Text'
      import EmployeeForm from '@/components/organisms/EmployeeForm'

      const EmployeeModalContent = ({ employee, editMode, onSave, onClose }) => {
        return (
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <Heading level={3}>
                {editMode ? (employee ? 'Edit Employee' : 'Add Employee') : 'Employee Details'}
              </Heading>
              <Button onClick={onClose} variant="ghost">
                <Icon name="X" size={20} className="text-surface-600 dark:text-surface-400" />
              </Button>
            </div>

            {editMode ? (
              <EmployeeForm employee={employee} onSave={onSave} onClose={onClose} />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <ProfileAvatar size="w-16 h-16" initial={employee?.name?.charAt(0) || 'N'} />
                  <div>
                    <Heading level={3} className="text-xl font-semibold">{employee?.name || 'Unknown'}</Heading>
                    <Text type="body">{employee?.position || 'No position'}</Text>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Text type="label">Email:</Text>
                    <Text type="value">{employee?.email || 'N/A'}</Text>
                  </div>
                  <div>
                    <Text type="label">Phone:</Text>
                    <Text type="value">{employee?.phone || 'N/A'}</Text>
                  </div>
                  <div>
                    <Text type="label">Department:</Text>
                    <Text type="value">{employee?.department || 'N/A'}</Text>
                  </div>
                  <div>
                    <Text type="label">Start Date:</Text>
                    <Text type="value">
                      {employee?.startDate ? new Date(employee.startDate).toLocaleDateString() : 'N/A'}
                    </Text>
                  </div>
                  <div>
                    <Text type="label">Status:</Text>
                    <Text type="value">{employee?.status || 'N/A'}</Text>
                  </div>
                  <div>
                    <Text type="label">Manager:</Text>
                    <Text type="value">{employee?.manager || 'N/A'}</Text>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }

      export default EmployeeModalContent