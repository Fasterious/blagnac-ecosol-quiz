import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qaheeauhuqvbmjyfgojz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaGVlYXVodXF2Ym1qeWZnb2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MzAwNTQsImV4cCI6MjA4MzEwNjA1NH0.DHTynuCtvtgdLR6LRSpadtHmt41q_gJmcAYs07cQ87I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

