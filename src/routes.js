import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import ProductListView from 'src/views/product/ProductListView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'board', element: <CustomerListView /> },
      { path: 'requirements', element: <CustomerListView /> },
      { path: 'tasks', element: <ProductListView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
