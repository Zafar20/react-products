import React from 'react'
import ContentLoader from "react-content-loader"

const SidebarSkeleton = () => {
  return (
    <ContentLoader 
    speed={1}
    width={300}
    height={350}
    viewBox="0 0 300 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="45" cy="45" r="45" /> 
    <rect x="0" y="110" rx="0" ry="0" width="110" height="20" /> 
    <rect x="0" y="140" rx="0" ry="0" width="150" height="20" /> 
    <rect x="0" y="210" rx="0" ry="0" width="120" height="25" /> 
    <rect x="0" y="260" rx="0" ry="0" width="120" height="25" /> 
    <rect x="0" y="310" rx="0" ry="0" width="120" height="25" />
  </ContentLoader>
  )
}

export default SidebarSkeleton