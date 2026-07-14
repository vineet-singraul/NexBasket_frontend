import React from 'react'
import SubOwnerDashboardLeftSide from './SubOwnerDashboardLeftSide'
import SubOwnerDashboardRightSide from './SubOwnerDashboardRightSide'

const SubOwnerDashboard = () => {
  return (
    <div className="sod-wrapper">
       <h2 style={{flexShrink:0}}>SUB OWNER DASHBOARD</h2>
       <div className="sod-row">
          <div className="sod-left"><SubOwnerDashboardLeftSide/></div>
          <div className="sod-right"><SubOwnerDashboardRightSide/></div>
       </div>
    </div>
  )
}

export default SubOwnerDashboard