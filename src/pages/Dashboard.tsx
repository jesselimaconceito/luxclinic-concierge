import { Calendar, Users, Clock, TrendingUp, Activity, CheckCircle2 } from "lucide-react";
import KPICard from "@/components/KPICard";
import { Card } from "@/components/ui/card";
import { useAppointments } from "@/hooks/useAppointments";
import { usePatients } from "@/hooks/usePatients";
import { formatTime, isToday, isSameDay } from "@/lib/dateUtils";

export default function Dashboard() {
  const { data: allAppointments = [], isLoading: loadingAppointments } = useAppointments();
  const { data: patients = [], isLoading: loadingPatients } = usePatients();

  // Filtrar compromissos de hoje usando start_datetime
  const today = new Date();
  const todayAppointments = allAppointments.filter(apt => {
    // Tentar start_datetime primeiro, fallback para date
    if (apt.start_datetime) {
      return isToday(apt.start_datetime);
    }
    // Fallback para compatibilidade com dados antigos
    return apt.date === today.toISOString().split('T')[0];
  });

  // Estatísticas
  const activePatients = patients.filter(p => p.status === 'active').length;
  const confirmedToday = todayAppointments.filter(apt => apt.status === 'confirmed').length;
  const totalVisits = patients.reduce((sum, p) => sum + p.total_visits, 0);

  const isLoading = loadingAppointments || loadingPatients;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2">
          Bem-vindo, Dr. Silva
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Seu dia está organizado. Aqui está sua visão geral.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Compromissos Hoje"
          value={todayAppointments.length}
          change={`${confirmedToday} confirmados`}
          changeType="positive"
          icon={Calendar}
          description="Agenda do dia"
        />
        <KPICard
          title="Pacientes Totais"
          value={patients.length}
          change={`${activePatients} ativos`}
          changeType="positive"
          icon={Users}
          description="Base de pacientes"
        />
        <KPICard
          title="Total de Visitas"
          value={totalVisits}
          change="Histórico completo"
          changeType="neutral"
          icon={Clock}
          description="Atendimentos realizados"
        />
        <KPICard
          title="Taxa de Confirmação"
          value={todayAppointments.length > 0 ? `${Math.round((confirmedToday / todayAppointments.length) * 100)}%` : "0%"}
          change="Hoje"
          changeType="positive"
          icon={CheckCircle2}
          description="Compromissos confirmados"
        />
        <KPICard
          title="Próximos 7 Dias"
          value={allAppointments.filter(apt => {
            const aptDate = apt.start_datetime ? new Date(apt.start_datetime) : new Date(apt.date);
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            return aptDate >= today && aptDate <= nextWeek;
          }).length}
          change="Agendados"
          changeType="neutral"
          icon={TrendingUp}
          description="Próxima semana"
        />
        <KPICard
          title="Status Geral"
          value="Ótimo"
          change="Sistema operacional"
          changeType="positive"
          icon={Activity}
          description="Tudo funcionando"
        />
      </div>

      {/* Today's Schedule */}
      <Card className="card-luxury p-4 md:p-6 lg:p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="mb-4 md:mb-6">
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
            Agenda de Hoje
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {todayAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium text-foreground mb-2">Nenhum compromisso hoje</p>
            <p className="text-sm text-muted-foreground">Aproveite para descansar ou planejar sua semana</p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {todayAppointments
              .sort((a, b) => {
                // Ordenar por start_datetime ou fallback para time
                const timeA = a.start_datetime ? new Date(a.start_datetime).getTime() : a.time;
                const timeB = b.start_datetime ? new Date(b.start_datetime).getTime() : b.time;
                return timeA > timeB ? 1 : -1;
              })
              .map((appointment, index) => {
                // Usar start_datetime se disponível, senão usar time (compatibilidade)
                const displayTime = appointment.start_datetime 
                  ? formatTime(appointment.start_datetime)
                  : appointment.time;
                const [hours, minutes] = displayTime.split(":");
                
                return (
                  <div
                    key={appointment.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 rounded-lg border border-border/50 bg-background p-3 md:p-4 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-accent/10">
                      <span className="text-xs font-medium text-accent">{hours}</span>
                      <span className="text-xl md:text-2xl font-bold text-accent">{minutes}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{appointment.patient_name}</h4>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <div
                      className={`self-start sm:self-center rounded-full px-3 md:px-4 py-1 md:py-1.5 text-xs font-medium whitespace-nowrap ${
                        appointment.status === "confirmed"
                          ? "bg-success/10 text-success"
                          : appointment.status === "pending"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {appointment.status === "confirmed" ? "Confirmado" : appointment.status === "pending" ? "Pendente" : "Concluído"}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <button className="card-luxury group p-5 md:p-6 text-left transition-all hover-glow">
          <div className="mb-3 md:mb-4 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-accent" />
          </div>
          <h3 className="mb-1.5 md:mb-2 font-semibold text-foreground">Novo Compromisso</h3>
          <p className="text-sm text-muted-foreground">Agende um novo atendimento</p>
        </button>

        <button className="card-luxury group p-5 md:p-6 text-left transition-all hover-glow">
          <div className="mb-3 md:mb-4 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Users className="h-5 w-5 md:h-6 md:w-6 text-accent" />
          </div>
          <h3 className="mb-1.5 md:mb-2 font-semibold text-foreground">Adicionar Paciente</h3>
          <p className="text-sm text-muted-foreground">Cadastre um novo paciente</p>
        </button>

        <button className="card-luxury group p-5 md:p-6 text-left transition-all hover-glow sm:col-span-2 md:col-span-1">
          <div className="mb-3 md:mb-4 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Activity className="h-5 w-5 md:h-6 md:w-6 text-accent" />
          </div>
          <h3 className="mb-1.5 md:mb-2 font-semibold text-foreground">Ver Relatórios</h3>
          <p className="text-sm text-muted-foreground">Analise suas métricas</p>
        </button>
      </div>
    </div>
  );
}
