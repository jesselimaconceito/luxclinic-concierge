import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthContextType, Profile, Organization, SignUpData } from '@/types/auth';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Carregar dados do usuário
  // -----------------------------
  const loadUserData = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      if (profileData?.organization_id && !profileData?.is_super_admin) {
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', profileData.organization_id)
          .single();

        if (orgError) throw orgError;
        setOrganization(orgData);
      } else {
        setOrganization(null);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      setProfile(null);
      setOrganization(null);
    }
  };

  // -----------------------------
  // Inicialização da sessão
  // -----------------------------
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();

      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        await loadUserData(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setOrganization(null);
      }

      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true);

        if (session?.user) {
          setUser(session.user);
          await loadUserData(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
          setOrganization(null);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // -----------------------------
  // Auth helpers
  // -----------------------------
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Login realizado com sucesso!');
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast.error(error.message || 'Erro ao fazer login');
      throw error;
    }
  };

  const signUp = async ({ email, password, fullName, organizationName }: SignUpData) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Erro ao criar usuário');

      const slug = organizationName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: organizationName,
          slug: `${slug}-${Date.now()}`,
          settings: {},
        })
        .select()
        .single();

      if (orgError) throw orgError;

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          organization_id: orgData.id,
          full_name: fullName,
          role: 'admin',
        });

      if (profileError) throw profileError;

      const { error: settingsError } = await supabase
        .from('settings')
        .insert({
          organization_id: orgData.id,
          clinic_name: organizationName,
          doctor_name: fullName,
          subscription_plan: 'premium',
        });

      if (settingsError) throw settingsError;

      toast.success('Cadastro realizado com sucesso! Faça login para continuar.');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast.error(error.message || 'Erro ao fazer cadastro');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setUser(null);
      setProfile(null);
      setOrganization(null);
      toast.success('Logout realizado com sucesso!');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      toast.success('Email de recuperação enviado!');
    } catch (error: any) {
      console.error('Erro ao resetar senha:', error);
      toast.error(error.message || 'Erro ao enviar email');
      throw error;
    }
  };

  // -----------------------------
  // Estados derivados (CHAVE)
  // -----------------------------
  const isAuthenticated = !!user;
  const isReady = !loading && (user === null || profile !== null);

  const value: AuthContextType = {
    user,
    profile,
    organization,
    isSuperAdmin: profile?.is_super_admin ?? false,
    loading,
    isAuthenticated,
    isReady,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}



