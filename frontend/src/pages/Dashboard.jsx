import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Briefcase, CheckSquare, Users, Activity } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ projetos: 0, tarefas: 0, responsaveis: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, tarRes, respRes] = await Promise.all([
          api.getProjetos(),
          api.getTarefas(),
          api.getResponsaveis()
        ]);
        setStats({
          projetos: projRes.length,
          tarefas: tarRes.length,
          responsaveis: respRes.length
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ 
        padding: '1rem', 
        borderRadius: 'var(--radius-lg)', 
        background: `rgba(${color}, 0.1)`, 
        color: `rgb(${color})` 
      }}>
        {icon}
      </div>
      <div>
        <h3 className="text-muted text-sm">{title}</h3>
        <p style={{ fontSize: '2rem', fontWeight: 700 }}>{loading ? '...' : value}</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
      </div>
      
      <div className="grid-cards">
        <StatCard title="Total de Projetos" value={stats.projetos} icon={<Briefcase size={28} />} color="99, 102, 241" />
        <StatCard title="Tarefas Registradas" value={stats.tarefas} icon={<CheckSquare size={28} />} color="16, 185, 129" />
        <StatCard title="Membros da Equipe" value={stats.responsaveis} icon={<Users size={28} />} color="245, 158, 11" />
        <StatCard title="Atividade Geral" value="98%" icon={<Activity size={28} />} color="239, 68, 68" />
      </div>

      <div style={{ marginTop: '3rem' }} className="card">
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Bem-vindo ao Controle de Projetos</h2>
        <p className="text-secondary">
          Este é o seu painel central. Utilize o menu lateral para gerenciar sua equipe, criar novos projetos e acompanhar o andamento de cada tarefa. O sistema está perfeitamente integrado à sua API Java Spring Boot!
        </p>
      </div>
    </div>
  );
}
