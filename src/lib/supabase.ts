import { createClient } from '@supabase/supabase-js';
import { UserData } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = supabaseUrl && supabaseKey;

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const saveUserData = async (data: Omit<UserData, 'id' | 'created_at'>) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }

  const { data: result, error } = await supabase
    .from('user_compositions')
    .insert([{
      first_name: data.full_name.split(' ')[0] || '',
      last_name: data.full_name.split(' ').slice(1).join(' ') || '',
      photo_url: data.photo_url,
      price: data.price,
      photo_x: data.photo_x,
      photo_y: data.photo_y,
      photo_size: data.photo_size,
      name_x: data.name_x,
      name_y: data.name_y,
      name_size: data.name_size,
      price_x: data.price_x,
      price_y: data.price_y,
      price_size: data.price_size
    }])
    .select()
    .single();

  if (error) throw error;
  return result;
};

export const getUserDataCount = async (): Promise<number> => {
  if (!supabase) {
    console.warn('Supabase not configured, returning default count');
    return 0;
  }

  const { count, error } = await supabase
    .from('user_compositions')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.warn('Error fetching count from Supabase:', error);
    return 0;
  }
  return count || 0;
};

export const uploadPhoto = async (file: File): Promise<string> => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `photos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('user-photos')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('user-photos')
    .getPublicUrl(filePath);

  return data.publicUrl;
};