import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://circxohxxquzdewqxitl.supabase.co'
const supabaseKey = 'sb_publishable_0fS3n2N6xXig2O9PNLv1qA_u1dYcbLM'
export const supabase = createClient(supabaseUrl, supabaseKey)