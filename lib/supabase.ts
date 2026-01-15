
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sqmhskaptnxucgdnnvme.supabase.co';
const supabaseAnonKey = 'sb_publishable_6NWzF3y0v3zCao5fVwB3Iw_tJOEBCZE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  return data;
}
