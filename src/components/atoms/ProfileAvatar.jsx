import React from 'react'

      const ProfileAvatar = ({ src, alt, size = 'w-8 h-8', initial = '', className = '' }) => {
        if (src) {
          return <img src={src} alt={alt} className={`${size} rounded-full ${className}`} />
        }
        return (
          <div className={`${size} bg-primary rounded-full flex items-center justify-center ${className}`}>
            <span className="text-white font-medium text-sm">
              {initial}
            </span>
          </div>
        )
      }

      export default ProfileAvatar