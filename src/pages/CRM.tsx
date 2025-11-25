import { Search, UserPlus, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CRM() {
  const patients = [
    {
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+351 912 345 678",
      lastVisit: "2024-01-15",
      status: "active",
      visits: 12,
    },
    {
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "+351 913 456 789",
      lastVisit: "2024-01-18",
      status: "active",
      visits: 8,
    },
    {
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "+351 914 567 890",
      lastVisit: "2023-12-20",
      status: "inactive",
      visits: 5,
    },
    {
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "+351 915 678 901",
      lastVisit: "2024-01-20",
      status: "active",
      visits: 15,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-1 md:mb-2">
            CRM
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Manage your patient relationships with care
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 md:px-6 py-2.5 md:py-3 text-sm font-semibold text-accent-foreground transition-all hover:shadow-[0_0_40px_hsl(var(--accent)/0.4)] hover-scale w-full sm:w-auto">
          <UserPlus className="h-4 w-4" />
          Add Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative animate-fade-in-up">
        <Search className="absolute left-3 md:left-4 top-1/2 h-4 w-4 md:h-5 md:w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patients by name, email, or phone..."
          className="pl-10 md:pl-12 h-11 md:h-12 bg-card border-border/50 focus:border-accent text-sm md:text-base"
        />
      </div>

      {/* Patient Cards Grid */}
      <div className="grid gap-4 md:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient, index) => (
          <div
            key={index}
            className="card-luxury group p-4 md:p-5 lg:p-6 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            {/* Patient Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
                <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-base md:text-lg font-semibold text-accent">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm md:text-base truncate">{patient.name}</h3>
                  <span
                    className={`text-xs font-medium ${
                      patient.status === "active"
                        ? "text-success"
                        : "text-muted-foreground"
                    }`}
                  >
                    {patient.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="shrink-0 rounded-full bg-accent/10 px-2.5 md:px-3 py-1 text-xs font-medium text-accent whitespace-nowrap">
                {patient.visits} visits
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 border-t border-border/50 pt-3 md:pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                <span className="truncate text-xs md:text-sm">{patient.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                <span className="text-xs md:text-sm">{patient.phone}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-3 md:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 border-t border-border/50 pt-3 md:pt-4">
              <span className="text-xs text-muted-foreground">
                Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
              </span>
              <button className="text-xs md:text-sm font-medium text-accent transition-colors hover:text-accent/80 self-start">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
