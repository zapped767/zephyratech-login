import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button/Button';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">Anywhere app.</span>
          </div>
          
          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                {user?.firstName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="user-details">
                <span className="user-name">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="user-email">{user?.email}</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="small" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p>You have successfully logged in to your dashboard.</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Analytics</h3>
            <p>View your performance metrics and insights</p>
            <Button variant="ghost" size="small">View Details</Button>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Manage your account preferences and configuration</p>
            <Button variant="ghost" size="small">Configure</Button>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Team</h3>
            <p>Collaborate with your team members</p>
            <Button variant="ghost" size="small">Manage Team</Button>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">📈</div>
            <h3>Reports</h3>
            <p>Generate and download comprehensive reports</p>
            <Button variant="ghost" size="small">Generate</Button>
          </div>
        </div>
        
        <div className="user-data-section">
          <h2>Your Profile</h2>
          <div className="user-data-card">
            <div className="data-row">
              <span className="data-label">User ID:</span>
              <span className="data-value">{user?.id}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Username:</span>
              <span className="data-value">{user?.username}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Email:</span>
              <span className="data-value">{user?.email}</span>
            </div>
            <div className="data-row">
              <span className="data-label">First Name:</span>
              <span className="data-value">{user?.firstName}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Last Name:</span>
              <span className="data-value">{user?.lastName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;