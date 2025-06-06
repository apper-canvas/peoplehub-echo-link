import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import employeeService from '../services/api/employeeService'

const MainFeature = ({ employees, setEmployees }) => {
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
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'on leave': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default: return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
    }
  }

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="p-6 border-b border-surface-200 dark:border-surface-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">
              Employee Management
            </h3>
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
              Manage your team members and their information
            </p>
          </div>
          
          <button
            onClick={() => {
              setSelectedEmployee(null)
              setEditMode(true)
              setShowModal(true)
            }}
            className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
          >
            <ApperIcon name="UserPlus" size={16} className="mr-2" />
            Add Employee
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            />
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 text-sm border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
            <option value="startDate">Sort by Start Date</option>
          </select>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="p-6">
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="Users" size={48} className="mx-auto text-surface-300 dark:text-surface-600 mb-4" />
            <p className="text-surface-600 dark:text-surface-400">
              {searchTerm || filterDepartment !== 'all' ? 'No employees match your search criteria' : 'No employees found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEmployees.map((employee) => (
              <motion.div
                key={employee.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-4 border border-surface-200 dark:border-surface-600 rounded-lg hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {employee.name?.charAt(0) || 'N'}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-surface-900 dark:text-white truncate">
                        {employee.name || 'Unknown'}
                      </h4>
                      <p className="text-sm text-surface-600 dark:text-surface-400 truncate">
                        {employee.position || 'No position'}
                      </p>
                      <p className="text-xs text-surface-500 dark:text-surface-500">
                        {employee.department || 'No department'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                      {employee.status || 'Unknown'}
                    </span>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleViewEmployee(employee)}
                        className="p-1 hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-colors"
                        title="View details"
                      >
                        <ApperIcon name="Eye" size={14} className="text-surface-600 dark:text-surface-400" />
                      </button>
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="p-1 hover:bg-surface-100 dark:hover:bg-surface-700 rounded transition-colors"
                        title="Edit employee"
                      >
                        <ApperIcon name="Edit" size={14} className="text-surface-600 dark:text-surface-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Delete employee"
                      >
                        <ApperIcon name="Trash2" size={14} className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Employee Modal */}
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
              <EmployeeModal
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

const EmployeeModal = ({ employee, editMode, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    department: employee?.department || '',
    position: employee?.position || '',
    startDate: employee?.startDate || '',
    status: employee?.status || 'active',
    manager: employee?.manager || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!editMode) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">
            Employee Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} className="text-surface-600 dark:text-surface-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {employee?.name?.charAt(0) || 'N'}
              </span>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-surface-900 dark:text-white">
                {employee?.name || 'Unknown'}
              </h4>
              <p className="text-surface-600 dark:text-surface-400">
                {employee?.position || 'No position'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-surface-600 dark:text-surface-400">Email:</span>
              <p className="text-surface-900 dark:text-white">{employee?.email || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium text-surface-600 dark:text-surface-400">Phone:</span>
              <p className="text-surface-900 dark:text-white">{employee?.phone || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium text-surface-600 dark:text-surface-400">Department:</span>
              <p className="text-surface-900 dark:text-white">{employee?.department || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium text-surface-600 dark:text-surface-400">Start Date:</span>
              <p className="text-surface-900 dark:text-white">
                {employee?.startDate ? new Date(employee.startDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <span className="font-medium text-surface-600 dark:text-surface-400">Status:</span>
              <p className="text-surface-900 dark:text-white">{employee?.status || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium text-surface-600 dark:text-surface-400">Manager:</span>
              <p className="text-surface-900 dark:text-white">{employee?.manager || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">
          {employee ? 'Edit Employee' : 'Add Employee'}
        </h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
        >
          <ApperIcon name="X" size={20} className="text-surface-600 dark:text-surface-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Position
          </label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on leave">On Leave</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Manager
          </label>
          <input
            type="text"
            value={formData.manager}
            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
          >
            {employee ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MainFeature