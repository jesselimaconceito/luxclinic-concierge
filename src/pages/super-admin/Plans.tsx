import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Crown, Save, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanConfig {
  id: string;
  plan_id: string;
  plan_name: string;
  plan_description: string | null;
  atendimento_inteligente: boolean;
  agendamento_automatico: boolean;
  lembretes_automaticos: boolean;
  confirmacao_email: boolean;
  base_conhecimento: boolean;
  relatorios_avancados: boolean;
  integracao_whatsapp: boolean;
  multi_usuarios: boolean;
  personalizacao_agente: boolean;
  analytics: boolean;
  max_agendamentos_mes: number | null;
  max_mensagens_whatsapp_mes: number | null;
  max_usuarios: number | null;
  max_pacientes: number | null;
  price_monthly: number | null;
  price_annual: number | null;
}

export default function Plans() {
  const queryClient = useQueryClient();
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PlanConfig>>({});

  // Carregar planos
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['admin-subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plan_configs')
        .select('*')
        .order('plan_id', { ascending: true });
      
      if (error) throw error;
      return data as PlanConfig[];
    },
  });

  // Mutation para atualizar plano
  const updatePlanMutation = useMutation({
    mutationFn: async (data: Partial<PlanConfig>) => {
      const { error } = await supabase
        .from('subscription_plan_configs')
        .update(data)
        .eq('plan_id', editingPlanId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Plano atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['admin-subscription-plans'] });
      setEditingPlanId(null);
      setFormData({});
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar plano:', error);
      toast.error('Erro ao atualizar plano');
    },
  });

  const handleEdit = (plan: PlanConfig) => {
    setEditingPlanId(plan.plan_id);
    setFormData(plan);
  };

  const handleCancel = () => {
    setEditingPlanId(null);
    setFormData({});
  };

  const handleSave = () => {
    if (!editingPlanId || !formData) return;
    updatePlanMutation.mutate(formData);
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'plano_a': return 'border-blue-500/30 bg-blue-500/5';
      case 'plano_b': return 'border-purple-500/30 bg-purple-500/5';
      case 'plano_c': return 'border-amber-500/30 bg-amber-500/5';
      case 'plano_d': return 'border-emerald-500/30 bg-emerald-500/5';
      default: return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  const getCrownColor = (planId: string) => {
    switch (planId) {
      case 'plano_a': return 'text-blue-500';
      case 'plano_b': return 'text-purple-500';
      case 'plano_c': return 'text-amber-500';
      case 'plano_d': return 'text-emerald-500';
      default: return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-purple-100">Gerenciar Planos</h1>
        <p className="text-purple-400 mt-1">
          Configure os recursos, limites e preços de cada plano de assinatura
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((plan) => {
          const isEditing = editingPlanId === plan.plan_id;
          const currentData = isEditing ? formData : plan;

          return (
            <Card 
              key={plan.plan_id}
              className={cn(
                "border-2 transition-all",
                getPlanColor(plan.plan_id),
                isEditing && "ring-2 ring-purple-500"
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className={cn("h-6 w-6", getCrownColor(plan.plan_id))} />
                    {isEditing ? (
                      <Input
                        value={currentData.plan_name || ''}
                        onChange={(e) => setFormData({ ...formData, plan_name: e.target.value })}
                        className="font-bold text-lg bg-slate-800/40 border-purple-800/30 text-purple-100"
                      />
                    ) : (
                      <CardTitle className="text-purple-100">{plan.plan_name}</CardTitle>
                    )}
                  </div>
                  {!isEditing && (
                    <Button
                      size="sm"
                      onClick={() => handleEdit(plan)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Editar
                    </Button>
                  )}
                </div>
                {isEditing ? (
                  <Textarea
                    value={currentData.plan_description || ''}
                    onChange={(e) => setFormData({ ...formData, plan_description: e.target.value })}
                    className="mt-2 bg-slate-800/40 border-purple-800/30 text-purple-100"
                    placeholder="Descrição do plano"
                  />
                ) : (
                  <CardDescription className="text-purple-400">
                    {plan.plan_description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Preços */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-purple-200">Preços</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-purple-300">Mensal (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={currentData.price_monthly || ''}
                        onChange={(e) => setFormData({ ...formData, price_monthly: parseFloat(e.target.value) || null })}
                        disabled={!isEditing}
                        className="bg-slate-800/40 border-purple-800/30 text-purple-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-purple-300">Anual (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={currentData.price_annual || ''}
                        onChange={(e) => setFormData({ ...formData, price_annual: parseFloat(e.target.value) || null })}
                        disabled={!isEditing}
                        className="bg-slate-800/40 border-purple-800/30 text-purple-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Recursos */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-purple-200">Recursos</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'atendimento_inteligente', label: 'Atendimento Inteligente' },
                      { key: 'agendamento_automatico', label: 'Agendamento Automático' },
                      { key: 'lembretes_automaticos', label: 'Lembretes Automáticos' },
                      { key: 'confirmacao_email', label: 'Confirmação Email' },
                      { key: 'base_conhecimento', label: 'Base de Conhecimento' },
                      { key: 'relatorios_avancados', label: 'Relatórios Avançados' },
                      { key: 'integracao_whatsapp', label: 'Integração WhatsApp' },
                      { key: 'multi_usuarios', label: 'Multi Usuários' },
                      { key: 'personalizacao_agente', label: 'Personalização Agente' },
                      { key: 'analytics', label: 'Analytics' },
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                        <Label className="text-xs text-purple-300 cursor-pointer" htmlFor={`${plan.plan_id}-${feature.key}`}>
                          {feature.label}
                        </Label>
                        <Switch
                          id={`${plan.plan_id}-${feature.key}`}
                          checked={currentData[feature.key as keyof PlanConfig] as boolean}
                          onCheckedChange={(checked) => setFormData({ ...formData, [feature.key]: checked })}
                          disabled={!isEditing}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limites */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-purple-200">Limites (deixe vazio para ilimitado)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-purple-300">Agendamentos/mês</Label>
                      <Input
                        type="number"
                        value={currentData.max_agendamentos_mes || ''}
                        onChange={(e) => setFormData({ ...formData, max_agendamentos_mes: e.target.value ? parseInt(e.target.value) : null })}
                        disabled={!isEditing}
                        placeholder="∞"
                        className="bg-slate-800/40 border-purple-800/30 text-purple-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-purple-300">Mensagens/mês</Label>
                      <Input
                        type="number"
                        value={currentData.max_mensagens_whatsapp_mes || ''}
                        onChange={(e) => setFormData({ ...formData, max_mensagens_whatsapp_mes: e.target.value ? parseInt(e.target.value) : null })}
                        disabled={!isEditing}
                        placeholder="∞"
                        className="bg-slate-800/40 border-purple-800/30 text-purple-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-purple-300">Usuários</Label>
                      <Input
                        type="number"
                        value={currentData.max_usuarios || ''}
                        onChange={(e) => setFormData({ ...formData, max_usuarios: e.target.value ? parseInt(e.target.value) : null })}
                        disabled={!isEditing}
                        placeholder="∞"
                        className="bg-slate-800/40 border-purple-800/30 text-purple-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-purple-300">Pacientes</Label>
                      <Input
                        type="number"
                        value={currentData.max_pacientes || ''}
                        onChange={(e) => setFormData({ ...formData, max_pacientes: e.target.value ? parseInt(e.target.value) : null })}
                        disabled={!isEditing}
                        placeholder="∞"
                        className="bg-slate-800/40 border-purple-800/30 text-purple-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Ações (quando editando) */}
                {isEditing && (
                  <div className="flex gap-3 pt-3 border-t border-purple-800/30">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1 border-purple-800/30 text-purple-200"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={updatePlanMutation.isPending}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {updatePlanMutation.isPending ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Alert */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-200">
                Atenção ao editar planos
              </p>
              <p className="text-xs text-amber-300">
                As alterações afetarão imediatamente todas as organizações com o plano selecionado.
                Os clientes verão as mudanças de recursos e limites na próxima vez que acessarem o sistema.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

