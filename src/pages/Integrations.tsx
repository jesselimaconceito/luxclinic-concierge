import { MessageSquare, Plug, Webhook, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Integrations() {
  const [integrations, setIntegrations] = useState({
    whatsappUnofficial: true,
    whatsappOfficial: false,
    openai: true,
    webhook: false,
  });

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const integrationCards = [
    {
      id: "whatsappUnofficial",
      name: "WhatsApp API (Não Oficial)",
      description: "Conecte-se com pacientes via WhatsApp usando a API não oficial",
      icon: MessageSquare,
      status: integrations.whatsappUnofficial,
      badge: "Popular",
    },
    {
      id: "whatsappOfficial",
      name: "WhatsApp Business API",
      description: "Integração oficial do WhatsApp Business para contas verificadas",
      icon: MessageSquare,
      status: integrations.whatsappOfficial,
      badge: "Premium",
    },
    {
      id: "openai",
      name: "Integração OpenAI",
      description: "Comunicação com pacientes e automação com inteligência artificial",
      icon: Sparkles,
      status: integrations.openai,
      badge: "IA",
    },
    {
      id: "webhook",
      name: "Webhooks Personalizados",
      description: "Conecte serviços externos e automatize fluxos de trabalho",
      icon: Webhook,
      status: integrations.webhook,
      badge: "Avançado",
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-1 md:mb-2">
          Integração
        </h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Conecte suas ferramentas favoritas e automatize seu fluxo de trabalho
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-3 animate-fade-in-up">
        <div className="card-luxury p-3 md:p-4 lg:p-6">
          <p className="text-caption mb-1.5 md:mb-2 text-[10px] md:text-xs">Integrações Ativas</p>
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            {Object.values(integrations).filter(Boolean).length}
          </p>
        </div>
        <div className="card-luxury p-3 md:p-4 lg:p-6">
          <p className="text-caption mb-1.5 md:mb-2 text-[10px] md:text-xs">Disponíveis</p>
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            {Object.values(integrations).length}
          </p>
        </div>
        <div className="card-luxury p-3 md:p-4 lg:p-6">
          <p className="text-caption mb-1.5 md:mb-2 text-[10px] md:text-xs">Em Breve</p>
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">5+</p>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid gap-4 md:gap-5 lg:gap-6 grid-cols-1 md:grid-cols-2">
        {integrationCards.map((integration, index) => (
          <div
            key={integration.id}
            className="card-luxury group p-4 md:p-5 lg:p-6 animate-fade-in-up"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className="flex items-start gap-3 md:gap-4 min-w-0 flex-1">
                <div
                  className={`flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                    integration.status
                      ? "bg-accent/20 text-accent"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <integration.icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm md:text-base">{integration.name}</h3>
                    <span
                      className={`text-[10px] md:text-xs font-medium px-1.5 md:px-2 py-0.5 rounded-full whitespace-nowrap ${
                        integration.badge === "Premium"
                          ? "bg-accent/10 text-accent"
                          : integration.badge === "AI"
                          ? "bg-success/10 text-success"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {integration.badge}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/50 pt-3 md:pt-4">
              <span className="text-xs md:text-sm text-muted-foreground">
                {integration.status ? "Ativa" : "Inativa"}
              </span>
              <Switch
                checked={integration.status}
                onCheckedChange={() =>
                  toggleIntegration(integration.id as keyof typeof integrations)
                }
                className="data-[state=checked]:bg-accent"
              />
            </div>

            {integration.status && (
              <div className="mt-3 md:mt-4 animate-fade-in">
                <button className="w-full rounded-lg border border-border/50 bg-secondary/50 py-2 text-xs md:text-sm font-medium text-foreground transition-all hover:border-accent hover:bg-accent/5">
                  Configurar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Coming Soon Section */}
      <div className="card-luxury p-5 md:p-6 lg:p-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center gap-2.5 md:gap-3 mb-3 md:mb-4">
          <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Plug className="h-4 w-4 md:h-5 md:w-5 text-accent" />
          </div>
          <h2 className="font-display text-lg md:text-xl font-semibold text-foreground">
            Em Breve
          </h2>
        </div>
        <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
          Estamos constantemente adicionando novas integrações para ajudá-lo a trabalhar de forma mais inteligente. Veja o que está por vir:
        </p>
        <div className="flex flex-wrap gap-2">
          {["Google Calendar", "Stripe Payments", "Zoom", "Slack", "Calendly"].map((name) => (
            <span
              key={name}
              className="rounded-full bg-secondary px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
