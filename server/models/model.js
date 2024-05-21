// import { createClient } from '@superbase/supabase-js'
const { createClient } = require('@supabase/supabase-js');

const supabaseURL = 'https://fiysnlfqqyqsgjdhiiwa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpeXNubGZxcXlxc2dqZGhpaXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNTA1NDcsImV4cCI6MjAzMTgyNjU0N30.Ms0gE5xFp2-KD2GNQn3dsOWaIpp1JEcJAQTxSyl0QBQ'
const supabase = createClient(supabaseURL, supabaseKey); 

// export default supabase; 
module.exports = supabase; 

