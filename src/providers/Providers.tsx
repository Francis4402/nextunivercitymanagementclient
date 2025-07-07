"use client"

import StoreProviders from "./StoreProviders"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProviders>
      {children}
    </StoreProviders>
  )
}

export default Providers