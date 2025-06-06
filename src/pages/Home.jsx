import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import employeeService from '../services/api/employeeService'
import leaveRequestService from '../services/api/leaveRequestService'
import reviewService from '../services/api/reviewService'

const Home = () => {
  const [employees, setEmployees] = useState([])
  const [leaveRequests, setLeaveRequests] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        const [employeesData, leaveData, reviewsData] = await Promise.all([
          employeeService.getAll(),
          leaveRequestService.getAll(),
          reviewService.getAll()
        ])
        setEmployees(employeesData || [])
        setLeaveRequests(leaveData || [])
        setReviews(reviewsData || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [])

  const stats = [
    {
      name: 'Total Employees',
      value: employees.length,
      change: '+12%',
      changeType: 'increase',
      icon: 'Users'
    },
    {
      name: 'Pending Leaves',
      value: leaveRequests.filter(req => req.status === 'pending').length,
      change: '-5%',
      changeType: 'decrease',
      icon: 'Calendar'
    },
    {
      name: 'Due Reviews',
      value: reviews.filter(review => {
        const reviewDate = new Date(review.date)
        const now = new Date()
        const diffMonths = (now.getFullYear() - reviewDate.getFullYear()) * 12 + (now.getMonth() - reviewDate.getMonth())
        return diffMonths >= 12
      }).length,
      change: '+3%',
      changeType: 'increase',
      icon: 'TrendingUp'
    },
    {
      name: 'Active Departments',
      value: new Set(employees.map(emp => emp.department)).size,
      change: '0%',
      changeType: 'neutral',
      icon: 'Building2'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'leave', message: 'Sarah Chen submitted vacation request', time: '2 hours ago' },
    { id: 2, type: 'review', message: 'Performance review completed for Mike Johnson', time: '4 hours ago' },
    { id: 3, type: 'employee', message: 'New employee onboarded: Alex Rodriguez', time: '1 day ago' },
    { id: 4, type: 'leave', message: 'Leave approved for Emma Wilson', time: '1 day ago' },
    { id: 5, type: 'review', message: 'Quarterly review scheduled for David Kim', time: '2 days ago' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertCircle" size={48} className="mx-auto text-red-500 mb-4" />
        <p className="text-surface-600 dark:text-surface-400">Error loading dashboard: {error}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-surface-900 dark:text-white mb-2">
          HR Dashboard
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Welcome back! Here's what's happening with your team today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-600 dark:text-surface-400">{stat.name}</p>
                <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.icon === 'Users' ? 'bg-blue-100 dark:bg-blue-900/20' :
                stat.icon === 'Calendar' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                stat.icon === 'TrendingUp' ? 'bg-green-100 dark:bg-green-900/20' :
                'bg-purple-100 dark:bg-purple-900/20'
              }`}>
                <ApperIcon 
                  name={stat.icon} 
                  size={24} 
                  className={
                    stat.icon === 'Users' ? 'text-blue-600 dark:text-blue-400' :
                    stat.icon === 'Calendar' ? 'text-yellow-600 dark:text-yellow-400' :
                    stat.icon === 'TrendingUp' ? 'text-green-600 dark:text-green-400' :
                    'text-purple-600 dark:text-purple-400'
                  }
                />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' :
                stat.changeType === 'decrease' ? 'text-red-600 dark:text-red-400' :
                'text-surface-600 dark:text-surface-400'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-surface-500 dark:text-surface-500 ml-2">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feature - Employee Management */}
        <div className="lg:col-span-2">
          <MainFeature employees={employees} setEmployees={setEmployees} />
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">
                Recent Activity
              </h3>
              <ApperIcon name="Activity" size={20} className="text-surface-400" />
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'leave' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                    activity.type === 'review' ? 'bg-green-100 dark:bg-green-900/20' :
                    'bg-blue-100 dark:bg-blue-900/20'
                  }`}>
                    <ApperIcon 
                      name={activity.type === 'leave' ? 'Calendar' : activity.type === 'review' ? 'Star' : 'User'} 
                      size={16} 
                      className={
                        activity.type === 'leave' ? 'text-yellow-600 dark:text-yellow-400' :
                        activity.type === 'review' ? 'text-green-600 dark:text-green-400' :
                        'text-blue-600 dark:text-blue-400'
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-surface-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark border border-primary hover:border-primary-dark rounded-lg transition-colors">
              View All Activities
            </button>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card border border-surface-200 dark:border-surface-700"
      >
        <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white mb-6">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Add Employee', icon: 'UserPlus', color: 'blue' },
            { name: 'Approve Leaves', icon: 'CheckCircle', color: 'green' },
            { name: 'Schedule Review', icon: 'Calendar', color: 'purple' },
            { name: 'Generate Report', icon: 'FileText', color: 'orange' }
          ].map((action) => (
            <button
              key={action.name}
              className={`p-4 rounded-lg border-2 border-dashed transition-colors hover:border-solid ${
                action.color === 'blue' ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20' :
                action.color === 'green' ? 'border-green-300 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20' :
                action.color === 'purple' ? 'border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20' :
                'border-orange-300 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20'
              }`}
            >
              <ApperIcon 
                name={action.icon} 
                size={24} 
                className={`mx-auto mb-2 ${
                  action.color === 'blue' ? 'text-blue-600' :
                  action.color === 'green' ? 'text-green-600' :
                  action.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`}
              />
              <p className="text-sm font-medium text-surface-900 dark:text-white">{action.name}</p>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Home