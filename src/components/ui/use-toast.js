import { useState } from 'react';

export const toast = ({ title, description, variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-500 text-white',
    destructive: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white'
  };

  const toastElement = document.createElement('div');
  toastElement.className = `
    fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg 
    ${variants[variant]} 
    transition-all duration-300 ease-in-out
  `;
  
  toastElement.innerHTML = `
    <div class="font-bold">${title}</div>
    <div class="text-sm">${description}</div>
  `;

  document.body.appendChild(toastElement);

  setTimeout(() => {
    toastElement.classList.add('opacity-0', 'translate-x-full');
    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 300);
  }, 3000);
};