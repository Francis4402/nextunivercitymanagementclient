import ChangedPasswordForm from '@/components/modules/PasswordChangeForms/ChangedPasswordForm'
import React from 'react'

const ChangePassword = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ChangedPasswordForm />
      </div>
    </div>
  )
}

export default ChangePassword