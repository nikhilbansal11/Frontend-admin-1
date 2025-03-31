import React, { useState } from 'react';
import { Button } from './button';

export const AlertDialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const childrenWithProps = React.Children.map(children, child => 
    React.cloneElement(child, { 
      openDialog, 
      closeDialog, 
      isOpen 
    })
  );

  return (
    <>
      {childrenWithProps}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            {React.Children.map(children, child => 
              child.type === AlertDialogContent ? 
                React.cloneElement(child, { closeDialog }) : null
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const AlertDialogTrigger = ({ children, openDialog }) => {
  return React.cloneElement(children, { 
    onClick: openDialog 
  });
};

export const AlertDialogContent = ({ 
  children, 
  closeDialog 
}) => (
  <div className="p-6">
    {children}
    <div className="mt-4 flex justify-end space-x-2">
      <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
      <AlertDialogAction>Confirm</AlertDialogAction>
    </div>
  </div>
);

export const AlertDialogHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

export const AlertDialogTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-900">
    {children}
  </h2>
);

export const AlertDialogDescription = ({ children }) => (
  <p className="text-sm text-gray-600 mt-2">
    {children}
  </p>
);

export const AlertDialogFooter = ({ children }) => (
  <div className="flex justify-end space-x-2 mt-4">
    {children}
  </div>
);

export const AlertDialogCancel = ({ children, onClick }) => (
  <Button variant="outline" onClick={onClick}>
    {children}
  </Button>
);

export const AlertDialogAction = ({ children, onClick }) => (
  <Button variant="destructive" onClick={onClick}>
    {children}
  </Button>
);