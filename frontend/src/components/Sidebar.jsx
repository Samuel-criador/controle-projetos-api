import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, CheckSquare, Users } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/projetos', icon: <Briefcase size={20} />, label: 'Projetos' },
    { path: '/tarefas', icon: <CheckSquare size={20} />, label: 'Tarefas' },
    { path: '/responsaveis', icon: <Users size={20} />, label: 'Equipe' },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(26, 29, 36, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border-color)',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
        <h1 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 700, 
          background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ControleProjetos
        </h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'white' : 'var(--text-secondary)',
              background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.15), transparent)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s'
            })}
          >
            <span style={{ color: 'inherit' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
