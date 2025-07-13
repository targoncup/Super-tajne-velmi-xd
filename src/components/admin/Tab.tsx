import React from 'react';

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <li
      className={`cursor-pointer p-2 rounded ${active ? 'bg-gray-700' : ''}`}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

export default Tab;
