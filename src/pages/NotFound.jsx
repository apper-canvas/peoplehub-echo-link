import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="text-center">
        <div className="mb-8">
          <ApperIcon name="FileQuestion" size={80} className="mx-auto text-surface-300 dark:text-surface-600 mb-4" />
          <h1 className="text-4xl font-heading font-bold text-surface-900 dark:text-white mb-2">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
            The page you're looking for doesn't exist in our HR system.
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
        >
          <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </motion.div>
  )
}

export default NotFound