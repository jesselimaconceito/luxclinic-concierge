import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ViewMode = "day" | "week" | "month";

interface Appointment {
  id: number;
  date: Date;
  time: string;
  patient: string;
  type: string;
  status: "confirmed" | "pending" | "completed";
}

// Dados de exemplo
const mockAppointments: Appointment[] = [
  { id: 1, date: new Date(2024, 10, 15, 9, 0), time: "09:00", patient: "Maria Santos", type: "Consulta", status: "confirmed" },
  { id: 2, date: new Date(2024, 10, 15, 14, 0), time: "14:00", patient: "Ana Costa", type: "Tratamento", status: "confirmed" },
  { id: 3, date: new Date(2024, 10, 16, 10, 30), time: "10:30", patient: "João Silva", type: "Retorno", status: "confirmed" },
  { id: 4, date: new Date(2024, 10, 16, 15, 0), time: "15:00", patient: "Pedro Oliveira", type: "Consulta", status: "pending" },
  { id: 5, date: new Date(2024, 10, 18, 11, 0), time: "11:00", patient: "Rita Mendes", type: "Avaliação", status: "confirmed" },
  { id: 6, date: new Date(2024, 10, 18, 16, 30), time: "16:30", patient: "Carlos Lima", type: "Tratamento", status: "confirmed" },
  { id: 7, date: new Date(2024, 10, 22, 9, 30), time: "09:30", patient: "Luisa Fernandes", type: "Consulta", status: "confirmed" },
  { id: 8, date: new Date(2024, 10, 22, 14, 30), time: "14:30", patient: "Marco Paulo", type: "Retorno", status: "pending" },
  { id: 9, date: new Date(2024, 10, 25, 10, 0), time: "10:00", patient: "Sofia Rodrigues", type: "Tratamento", status: "confirmed" },
];

export default function Agenda() {
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Funções de navegação
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obter dias da semana atual
  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  // Obter dias do mês
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  // Verificar se um dia tem compromissos
  const getAppointmentsForDay = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    return mockAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.getFullYear() === year &&
             aptDate.getMonth() === month &&
             aptDate.getDate() === day;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Obter compromissos para uma data específica
  const getAppointmentsForDate = (date: Date) => {
    return mockAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Obter compromissos em um horário específico
  const getAppointmentsForHour = (date: Date, hour: number) => {
    return mockAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString() &&
             aptDate.getHours() === hour;
    });
  };

  // Obter compromissos do mês
  const getAppointmentsForMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    return mockAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.getFullYear() === year && aptDate.getMonth() === month;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth();
  const today = new Date();
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                         currentDate.getFullYear() === today.getFullYear();

  const weekDays = getWeekDays();
  const selectedDayAppointments = selectedDay ? getAppointmentsForDay(selectedDay) : [];

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const getSelectedDayName = () => {
    if (!selectedDay) return "";
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
    return date.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const handlePrevious = () => {
    if (viewMode === "day") goToPreviousDay();
    else if (viewMode === "week") goToPreviousWeek();
    else goToPreviousMonth();
  };

  const handleNext = () => {
    if (viewMode === "day") goToNextDay();
    else if (viewMode === "week") goToNextWeek();
    else goToNextMonth();
  };

  const getHeaderTitle = () => {
    if (viewMode === "day") {
      return currentDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } else if (viewMode === "week") {
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.getDate()} - ${end.getDate()} de ${currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}`;
    }
    return currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-3 md:space-y-4 lg:space-y-5 p-4 md:p-6 lg:p-8 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
        <div>
          <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-1">
            Agenda
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Gerencie sua agenda com precisão
          </p>
        </div>
        <button 
          onClick={goToToday}
          className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_0_40px_hsl(var(--accent)/0.4)] hover-scale w-full sm:w-auto"
        >
          <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
          Ir para Hoje
        </button>
      </div>

      {/* View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 card-luxury p-2.5 md:p-3 animate-fade-in-up">
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 shrink-0"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold text-foreground text-xs md:text-sm min-w-[180px] md:min-w-[220px] text-center capitalize">
            {getHeaderTitle()}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 shrink-0"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1 md:gap-1.5 rounded-lg bg-secondary p-0.5 md:p-1">
          {(["day", "week", "month"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "flex-1 sm:flex-none rounded-md px-2.5 md:px-3 lg:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-medium capitalize transition-all duration-200",
                viewMode === mode
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {mode === "day" ? "Dia" : mode === "week" ? "Semana" : "Mês"}
            </button>
          ))}
        </div>
      </div>

      {/* DAY VIEW - Grade de Horários */}
      {viewMode === "day" && (
        <div className="card-luxury p-3 md:p-4 lg:p-6 animate-fade-in-up overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[300px]">
              {hours.map((hour) => {
                const appointments = getAppointmentsForHour(currentDate, hour);
                return (
                  <div
                    key={hour}
                    className={cn(
                      "flex border-b border-border/30 min-h-[60px]",
                      hour === new Date().getHours() && currentDate.toDateString() === today.toDateString() && "bg-accent/5"
                    )}
                  >
                    {/* Hora */}
                    <div className="w-16 md:w-20 shrink-0 pr-3 py-2 text-xs md:text-sm text-muted-foreground font-medium">
                      {formatHour(hour)}
                    </div>
                    
                    {/* Eventos */}
                    <div className="flex-1 py-1 space-y-1">
                      {appointments.map((apt) => (
                        <div
                          key={apt.id}
                          className={cn(
                            "rounded-md p-2 text-xs md:text-sm border-l-4 transition-all hover:shadow-md cursor-pointer",
                            apt.status === "confirmed" 
                              ? "bg-accent/10 border-accent" 
                              : apt.status === "pending"
                              ? "bg-muted border-muted-foreground"
                              : "bg-success/10 border-success"
                          )}
                        >
                          <div className="font-semibold text-foreground">{apt.time} - {apt.patient}</div>
                          <div className="text-muted-foreground">{apt.type}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* WEEK VIEW - 7 Colunas de Dias */}
      {viewMode === "week" && (
        <div className="card-luxury p-3 md:p-4 lg:p-6 animate-fade-in-up overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Cabeçalho dos Dias */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-2 mb-2 pb-2 border-b border-border">
                <div></div>
                {weekDays.map((day, i) => {
                  const isToday = day.toDateString() === today.toDateString();
                  return (
                    <div key={i} className="text-center">
                      <div className={cn(
                        "text-xs font-medium text-muted-foreground uppercase",
                        isToday && "text-accent"
                      )}>
                        {day.toLocaleDateString("pt-BR", { weekday: "short" })}
                      </div>
                      <div className={cn(
                        "text-lg md:text-xl font-bold",
                        isToday ? "text-accent" : "text-foreground"
                      )}>
                        {day.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Grade de Horários */}
              <div className="space-y-0">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-[80px_repeat(7,1fr)] gap-2 border-b border-border/20 min-h-[50px]">
                    {/* Hora */}
                    <div className="text-xs text-muted-foreground font-medium py-1">
                      {formatHour(hour)}
                    </div>
                    
                    {/* Dias da Semana */}
                    {weekDays.map((day, i) => {
                      const appointments = getAppointmentsForHour(day, hour);
                      const isToday = day.toDateString() === today.toDateString();
                      const isCurrentHour = hour === new Date().getHours();
                      
                      return (
                        <div
                          key={i}
                          className={cn(
                            "py-0.5 px-1",
                            isToday && isCurrentHour && "bg-accent/5"
                          )}
                        >
                          {appointments.map((apt) => (
                            <div
                              key={apt.id}
                              className={cn(
                                "rounded p-1 text-[10px] border-l-2 mb-1 truncate cursor-pointer hover:shadow-sm transition-all",
                                apt.status === "confirmed" 
                                  ? "bg-accent/10 border-accent" 
                                  : apt.status === "pending"
                                  ? "bg-muted border-muted-foreground"
                                  : "bg-success/10 border-success"
                              )}
                              title={`${apt.time} - ${apt.patient} - ${apt.type}`}
                            >
                              <div className="font-semibold truncate">{apt.patient}</div>
                              <div className="text-muted-foreground truncate">{apt.type}</div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MONTH VIEW - Calendário */}
      {viewMode === "month" && (
        <div className="card-luxury p-3 md:p-4 lg:p-6 animate-fade-in-up">
          <div className="grid grid-cols-7 gap-1.5 md:gap-2 lg:gap-3">
            {/* Day Headers */}
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="text-center pb-1 md:pb-2">
                <span className="text-caption text-[9px] md:text-[10px] lg:text-xs">{day}</span>
              </div>
            ))}

            {/* Empty cells before first day */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 sm:h-12 md:h-14 lg:h-16" />
            ))}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isToday = isCurrentMonth && day === today.getDate();
              const dayAppointments = getAppointmentsForDay(day);
              const hasAppointments = dayAppointments.length > 0;

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    "relative rounded-md md:rounded-lg border border-border/50 transition-all duration-200",
                    "h-10 sm:h-12 md:h-14 lg:h-16",
                    "flex flex-col items-center justify-center p-0.5 md:p-1",
                    "hover:border-accent/50 hover:shadow-md cursor-pointer",
                    "hover:bg-secondary/50",
                    isToday && "border-accent bg-accent/10 font-bold"
                  )}
                >
                  <div className={cn(
                    "text-[10px] md:text-xs lg:text-sm font-medium",
                    isToday ? "text-accent" : "text-foreground"
                  )}>
                    {day}
                  </div>
                  {hasAppointments && (
                    <div className="absolute bottom-0.5 md:bottom-1 flex gap-0.5">
                      {dayAppointments.slice(0, 3).map((apt) => (
                        <div 
                          key={apt.id}
                          className={cn(
                            "h-0.5 w-0.5 md:h-1 md:w-1 rounded-full",
                            apt.status === "confirmed" ? "bg-accent" : "bg-muted-foreground/50"
                          )} 
                        />
                      ))}
                      {dayAppointments.length > 3 && (
                        <span className="text-[6px] md:text-[8px] text-muted-foreground">+{dayAppointments.length - 3}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal de Eventos do Dia */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg md:text-xl capitalize">
              {getSelectedDayName()}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {selectedDayAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Nenhum compromisso neste dia
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-3">
                  {selectedDayAppointments.length} {selectedDayAppointments.length === 1 ? "compromisso" : "compromissos"}
                </p>
                {selectedDayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="rounded-lg border border-border/50 bg-background p-3 space-y-2"
                  >
                    {/* Time */}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm font-semibold text-foreground">
                        {appointment.time}
                      </span>
                      <div
                        className={cn(
                          "ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium",
                          appointment.status === "confirmed"
                            ? "bg-success/10 text-success"
                            : appointment.status === "pending"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {appointment.status === "confirmed" ? "Confirmado" : appointment.status === "pending" ? "Pendente" : "Concluído"}
                      </div>
                    </div>

                    {/* Patient */}
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {appointment.patient}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
