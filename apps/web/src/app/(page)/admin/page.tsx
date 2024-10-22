'use client';
import { useState } from 'react';
import Sidebar from '@/Compenents/SideBar';

import Dashboard from '@/Compenents/Admin_Panel/DashBoard';
import CreatePainting from '@/Compenents/Admin_Panel/Createpainting';

export default function Admin() {
  const [selectedPage, setSelectedPage] = useState('Dashboard');

  const renderContent = () => {
    switch (selectedPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Performance':
        return <div>Performance Content</div>;
      case 'Guides':
        return <div>Guides Content</div>;
      case 'Hotspots':
        return <div>Hotspots Content</div>;
      case 'Checklists':
        return <div>Checklists Content</div>;
      case 'Themes':
        return <div>Themes Content</div>;
      case 'Create-painting':
        return <CreatePainting />;
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="flex">
      <Sidebar setSelectedPage={setSelectedPage} />
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
}
