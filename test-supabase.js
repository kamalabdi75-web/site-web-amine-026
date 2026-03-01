require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
  if (error) {
    console.error("SUPABASE ERROR:", error);
  } else {
    console.log("Success! Products:", data.length);
  }
}
test();
