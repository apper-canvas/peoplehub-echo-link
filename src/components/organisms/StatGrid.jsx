import React from 'react'
      import StatCard from '@/components/molecules/StatCard'

      const StatGrid = ({ stats }) => {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.name} {...stat} delay={index * 0.1} />
            ))}
          </div>
        )
      }

      export default StatGrid