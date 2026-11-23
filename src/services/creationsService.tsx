import { supabase } from './supabase';

export interface UserCreation {
  id: string;
  user_id: string;
  project_title: string;
  category_name: string | null;
  exp_earned: number;
  completed_at: string;
}

export async function saveUserCreation(params: {
  projectTitle: string;
  categoryName?: string;
  expEarned?: number;
}): Promise<{ data: UserCreation | null; error: any }> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { data: null, error: authError ?? new Error('Sesi pengguna tidak ditemukan') };
  }

  const { data, error } = await supabase
    .from('user_creations')
    .insert({
      user_id: user.id,
      project_title: params.projectTitle,
      category_name: params.categoryName ?? null,
      exp_earned: params.expEarned ?? 50,
    })
    .select()
    .single();

  return { data, error };
}

export async function getUserCreations(): Promise<{
  data: UserCreation[];
  error: any;
}> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { data: [], error: authError ?? new Error('Sesi pengguna tidak ditemukan') };
  }

  const { data, error } = await supabase
    .from('user_creations')
    .select('*')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false });

  return { data: data ?? [], error };
}