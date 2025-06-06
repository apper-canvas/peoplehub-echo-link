import React, { useState } from 'react'
      import { AnimatePresence, motion } from 'framer-motion'
      import { toast } from 'react-toastify'
      import employeeService from '@/services/api/employeeService'
      import Heading from '@/components/atoms/Heading'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      import SearchInput from '@/components/molecules/SearchInput'
      import Select from '@/components/molecules/Select'
      import EmployeeList from '@/components/organisms/EmployeeList'
      import EmployeeModalContent from '@/components/organisms/EmployeeModalContent'

      const EmployeeTable = ({ employees, setEmployees }) => {
        const [selectedEmployee, setSelectedEmployee] = useState(null)
        const [showModal, setShowModal] = useState(false)
        const [editMode, setEditMode] = useState(false)
        const [searchTerm, setSearchTerm] = useState('')
        const [filterDepartment, setFilterDepartment] = useState('all')
        const [sortBy, setSortBy] = useState('name')

        const departments = ['all', ...new Set(employees.map(emp => emp.department).filter(Boolean))]

        const filteredEmployees = employees
          .filter(emp => {
            const matchesSearch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 emp.position?.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment
            return matchesSearch && matchesDepartment
          })
          .sort((a, b) => {
            if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '')
            if (sortBy === 'department') return (a.department || '').localeCompare(b.department || '')
            if (sortBy === 'startDate') return new Date(b.startDate || 0) - new Date(a.startDate || 0)
            return 0
          })

        const handleViewEmployee = (employee) => {
          setSelectedEmployee(employee)
          setEditMode(false)
          setShowModal(true)
        }

        const handleEditEmployee = (employee) => {
          setSelectedEmployee(employee)
          setEditMode(true)
          setShowModal(true)
        }

        const handleDeleteEmployee = async (id) => {
          if (!window.confirm('Are you sure you want to delete this employee?')) return

          try {
            await employeeService.delete(id)
            setEmployees(prev => prev.filter(emp => emp.id !== id))
            toast.success('Employee deleted successfully')
          } catch (error) {
            toast.error('Failed to delete employee')
          }
        }

        const handleSaveEmployee = async (formData) => {
          try {
            let updatedEmployee
            if (selectedEmployee?.id) {
              updatedEmployee = await employeeService.update(selectedEmployee.id, formData)
              setEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? updatedEmployee : emp))
              toast.success('Employee updated successfully')
            } else {
              updatedEmployee = await employeeService.create(formData)
              setEmployees(prev => [...prev, updatedEmployee])
              toast.success('Employee created successfully')
            }
            setShowModal(false)
            setSelectedEmployee(null)
          } catch (error) {
            toast.error('Failed to save employee')
          }
        }

        const getStatusColor = (status) => {
          switch (status?.toLowerCase()) {
            case 'active': return 'green'
            case 'inactive': return 'red'
            case 'on leave': return 'yellow'
            default: return 'neutral'
          }
        }

        return (
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700">
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <Heading level={3}>Employee Management</Heading>
                  <Text type="body" className="mt-1">Manage your team members and their information</Text>
                </div>

                <Button
                  onClick={() => {
                    setSelectedEmployee(null)
                    setEditMode(true)
                    setShowModal(true)
                  }}
                  variant="primary"
                >
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Add Employee
                </Button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <SearchInput
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />

                <Select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </Select>

                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="department">Sort by Department</option>
                  <option value="startDate">Sort by Start Date</option>
                </Select>
              </div>
            </div>

            <div className="p-6">
              <EmployeeList
                employees={filteredEmployees}
                onView={handleViewEmployee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
                getStatusColor={getStatusColor}
                searchTerm={searchTerm}
                filterDepartment={filterDepartment}
              />
            </div>

            <AnimatePresence>
              {showModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                  onClick={() => setShowModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-surface-800 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EmployeeModalContent
                      employee={selectedEmployee}
                      editMode={editMode}
                      onSave={handleSaveEmployee}
                      onClose={() => setShowModal(false)}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }

      export default EmployeeTable