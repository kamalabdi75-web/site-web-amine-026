import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
    const { data, error } = await supabase
        .from('communes')
        .select('*')
        .limit(10);

    if (error) {
        console.error("Error:", error.message);
    } else {
        console.table(data);
    }
}

checkData();
