import React from 'react';

export const Table = ({ children, className = '' }) => (
  <div className={`w-full border border-gray-200 ${className}`}>
    {children}
  </div>
);

export const TableHeader = ({ children, className = '' }) => (
  <div className={`bg-gray-100 ${className}`}>
    {children}
  </div>
);

export const TableBody = ({ children, className = '' }) => (
  <div className={`divide-y divide-gray-200 ${className}`}>
    {children}
  </div>
);

export const TableRow = ({ children, className = '' }) => (
  <div className={`flex items-center hover:bg-gray-50 ${className}`}>
    {children}
  </div>
);

export const TableHead = ({ children, className = '' }) => (
  <div className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </div>
);

export const TableCell = ({ children, className = '' }) => (
  <div className={`px-4 py-3 text-sm text-gray-900 ${className}`}>
    {children}
  </div>
);
