import React, { useState, useEffect } from 'react'
      import { motion } from 'framer-motion'
      import employeeService from '@/services/api/employeeService'
      import leaveRequestService from '@/services/api/leaveRequestService'
      import reviewService from '@/services/api/reviewService'
      import Heading from '@/components/atoms/Heading'
      import Text from '@/components/atoms/Text'
      import Icon from '@/components/atoms/Icon'
      import StatGrid from '@/components/organisms/StatGrid'
      import EmployeeTable from '@/components/organisms/EmployeeTable'
      import RecentActivityFeed from '@/components/organisms/RecentActivityFeed'
      import QuickActionsSection from '@/components/organisms/QuickActionsSection'

      const HomePage = () => {
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
              <Icon name="AlertCircle" size={48} className="mx-auto text-red-500 mb-4" />
              <Text type="body">Error loading dashboard: {error}</Text>
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
              <Heading level={1}>HR Dashboard</Heading>
              <Text type="body">Welcome back! Here's what's happening with your team today.</Text>
            </div>

            {/* Stats Grid */}
            <StatGrid stats={stats} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Feature - Employee Management */}
              <div className="lg:col-span-2">
                <EmployeeTable employees={employees} setEmployees={setEmployees} />
              </div>

              {/* Recent Activities */}
              <div className="lg:col-span-1">
                <RecentActivityFeed activities={recentActivities} />
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActionsSection />
          </motion.div>
        )
      }

      export default HomePage