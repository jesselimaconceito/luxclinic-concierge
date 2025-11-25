import { Check, Crown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Subscription() {
  const plans = [
    {
      name: "Starter",
      price: "€49",
      period: "per month",
      description: "Perfect for solo practitioners",
      features: [
        "Up to 50 patients",
        "1 professional agenda",
        "Basic integrations",
        "Email support",
        "5,000 tokens/month",
      ],
      current: false,
    },
    {
      name: "Premium",
      price: "€129",
      period: "per month",
      description: "Ideal for growing clinics",
      features: [
        "Up to 200 patients",
        "3 professional agendas",
        "All integrations",
        "Priority support",
        "20,000 tokens/month",
        "Advanced analytics",
        "WhatsApp integration",
      ],
      current: true,
      recommended: true,
    },
    {
      name: "Enterprise",
      price: "€299",
      period: "per month",
      description: "For established clinics",
      features: [
        "Unlimited patients",
        "Unlimited agendas",
        "All integrations",
        "24/7 dedicated support",
        "Unlimited tokens",
        "Custom features",
        "API access",
        "White-label options",
      ],
      current: false,
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center animate-fade-in">
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
          Choose Your Plan
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Select the perfect plan for your practice. Upgrade, downgrade, or cancel anytime.
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className="card-luxury p-4 md:p-5 lg:p-6 animate-fade-in-up bg-gradient-to-r from-accent/5 to-accent/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-accent">
              <Crown className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm md:text-base">Current Plan: Premium</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Renews on February 15, 2024</p>
            </div>
          </div>
          <button className="w-full sm:w-auto rounded-lg border border-border/50 bg-background px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-foreground transition-all hover:border-accent hover:shadow-lg">
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-4 md:gap-5 lg:gap-6 grid-cols-1 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-xl border-2 transition-all duration-300 animate-fade-in-up",
              plan.current
                ? "border-accent shadow-[0_0_40px_hsl(var(--accent)/0.2)]"
                : "border-border/50 hover:border-accent/50 hover:shadow-lg"
            )}
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            {/* Recommended Badge */}
            {plan.recommended && (
              <div className="absolute right-4 md:right-6 top-4 md:top-6 flex items-center gap-1 rounded-full bg-accent px-2.5 md:px-3 py-1 text-xs font-semibold text-accent-foreground">
                <Sparkles className="h-3 w-3" />
                Recommended
              </div>
            )}

            <div className="p-5 md:p-6 lg:p-8">
              {/* Plan Header */}
              <div className="mb-5 md:mb-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1.5 md:mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 md:gap-3">
                    <div className="mt-0.5 flex h-4 w-4 md:h-5 md:w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-accent" />
                    </div>
                    <span className="text-xs md:text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={cn(
                  "w-full rounded-lg py-2.5 md:py-3 text-xs md:text-sm font-semibold transition-all",
                  plan.current
                    ? "bg-secondary text-foreground cursor-default"
                    : "bg-accent text-accent-foreground hover:shadow-[0_0_40px_hsl(var(--accent)/0.4)] hover-scale"
                )}
              >
                {plan.current ? "Current Plan" : "Upgrade to " + plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid gap-4 md:gap-5 lg:gap-6 grid-cols-1 md:grid-cols-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="card-luxury p-4 md:p-5 lg:p-6">
          <h3 className="font-semibold text-foreground mb-1.5 md:mb-2 text-sm md:text-base">Flexible Billing</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            All plans include a 14-day free trial. Cancel anytime with no questions asked.
          </p>
        </div>
        <div className="card-luxury p-4 md:p-5 lg:p-6">
          <h3 className="font-semibold text-foreground mb-1.5 md:mb-2 text-sm md:text-base">Need Help Choosing?</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Contact our team for personalized recommendations based on your clinic's needs.
          </p>
        </div>
      </div>
    </div>
  );
}
