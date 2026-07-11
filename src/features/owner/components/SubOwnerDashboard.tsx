import React from 'react'
import SubOwnerDashboardLeftSide from './SubOwnerDashboardLeftSide'
import SubOwnerDashboardRightSide from './SubOwnerDashboardRightSide'

const SubOwnerDashboard = () => {
  return (
    <>
       <h2>SUB OWNER DASHBOARD</h2>
       <div style={{width:'100%' , display:'flex',gap:10,justifyContent:'space-between',boxSizing:'border-box'}}>
          <div style={{flex:'0 0 30%',minWidth:0}}><SubOwnerDashboardLeftSide/></div>
          <div style={{flex:'1 1 0%',minWidth:0}}><SubOwnerDashboardRightSide/></div>
       </div>
    </>
  )
}

export default SubOwnerDashboard