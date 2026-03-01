const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
    console.log("Fetching categories sample...");
    const { data, error } = await supabase.from('categories').select('*').limit(5);
    if (error) {
        console.error("Error from Supabase:", error);
    } else {
        console.log("Categories:", data);
    }
}
run();
