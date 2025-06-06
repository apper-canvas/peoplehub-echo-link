import React from 'react'
      import ProfileAvatar from '@/components/atoms/ProfileAvatar'
      import Text from '@/components/atoms/Text'

      const ProfileInfo = ({ src, name, email, className = '' }) => {
        return (
          <div className={`flex items-center space-x-3 ${className}`}>
            <ProfileAvatar src={src} alt="Profile" />
            <Text type="normal" className="font-medium">{name}</Text>
          </div>
        )
      }

      export default ProfileInfo