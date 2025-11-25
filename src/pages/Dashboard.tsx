import { Calendar, Users, Clock, TrendingUp, Activity, CheckCircle2 } from "lucide-react";
import KPICard from "@/components/KPICard";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const todayAppointments = [
    { time: "09:00", patient: "Maria Santos", type: "Consultation", status: "confirmed" },
    { time: "10:30", patient: "João Silva", type: "Follow-up", status: "confirmed" },
    { time: "14:00", patient: "Ana Costa", type: "Treatment", status: "pending" },
    { time: "16:00", patient: "Pedro Oliveira", type: "Consultation", status: "confirmed" },
  ];

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2">
          Welcome, Dr. Silva
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Your day is beautifully organized. Here's your overview.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Today's Appointments"
          value={4}
          change="+2 from yesterday"
          changeType="positive"
          icon={Calendar}
          description="All confirmed and ready"
        />
        <KPICard
          title="Active Patients"
          value={127}
          change="+8 this week"
          changeType="positive"
          icon={Users}
          description="Growing steadily"
        />
        <KPICard
          title="Avg. Service Time"
          value="32min"
          change="-5min improvement"
          changeType="positive"
          icon={Clock}
          description="Efficiency optimized"
        />
        <KPICard
          title="Token Usage"
          value="8.2K"
          change="78% of monthly limit"
          changeType="neutral"
          icon={TrendingUp}
          description="Well within budget"
        />
        <KPICard
          title="Response Rate"
          value="94%"
          change="+3% this month"
          changeType="positive"
          icon={Activity}
          description="Excellent engagement"
        />
        <KPICard
          title="Confirmations"
          value="89%"
          change="+5% improvement"
          changeType="positive"
          icon={CheckCircle2}
          description="Strong commitment"
        />
      </div>

      {/* Today's Schedule */}
      <Card className="card-luxury p-4 md:p-6 lg:p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="mb-4 md:mb-6">
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
            Today's Schedule
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {todayAppointments.map((appointment, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 rounded-lg border border-border/50 bg-background p-3 md:p-4 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-accent/10">
                <span className="text-xs font-medium text-accent">{appointment.time.split(":")[0]}</span>
                <span className="text-xl md:text-2xl font-bold text-accent">{appointment.time.split(":")[1]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">{appointment.patient}</h4>
                <p className="text-sm text-muted-foreground">{appointment.type}</p>
              </div>
              <div
                className={`self-start sm:self-center rounded-full px-3 md:px-4 py-1 md:py-1.5 text-xs font-medium whitespace-nowrap ${
                  appointment.status === "confirmed"
                    ? "bg-success/10 text-success"
                    : "bg-accent/10 text-accent"
                }`}
              >
                {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <button className="card-luxury group p-5 md:p-6 text-left transition-all hover-glow">
          <div className="mb-3 md:mb-4 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-accent" />
          </div>
          <h3 className="mb-1.5 md:mb-2 font-semibold text-foreground">New Appointment</h3>
          <p className="text-sm text-muted-foreground">Schedule a new commitment with care</p>
        </button>

        <button className="card-luxury group p-5 md:p-6 text-left transition-all hover-glow">
          <div className="mb-3 md:mb-4 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Users className="h-5 w-5 md:h-6 md:w-6 text-accent" />
          </div>
          <h3 className="mb-1.5 md:mb-2 font-semibold text-foreground">Add Patient</h3>
          <p className="text-sm text-muted-foreground">Create a new patient record</p>
        </button>

        <button className="card-luxury group p-5 md:p-6 text-left transition-all hover-glow sm:col-span-2 md:col-span-1">
          <div className="mb-3 md:mb-4 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Activity className="h-5 w-5 md:h-6 md:w-6 text-accent" />
          </div>
          <h3 className="mb-1.5 md:mb-2 font-semibold text-foreground">View Reports</h3>
          <p className="text-sm text-muted-foreground">Analyze your performance metrics</p>
        </button>
      </div>
    </div>
  );
}
