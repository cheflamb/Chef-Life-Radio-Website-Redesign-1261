import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://iqbxhfmslyoevoegiuap.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxYnhoZm1zbHlvZXZvZWdpdWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzQ3NTEsImV4cCI6MjA2NjM1MDc1MX0.gD6cHYjvK3G4e3LB95LnH_q32sBipfvxJ1U6uG-TULU'

if(SUPABASE_URL == 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY == '<ANON_KEY>' ){
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})