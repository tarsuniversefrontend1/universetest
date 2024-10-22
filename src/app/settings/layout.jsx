import LeftNav from '@/components/Settings/LeftNav/LeftNav'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className="flex lg:gap-16 md:gap-6   px-5 max-w-6xl mx-auto">
      <LeftNav />
      <div className="mx-auto md:mx-0">{children}</div>
    </div>
  );
}

export default layout

// settings - layout.js