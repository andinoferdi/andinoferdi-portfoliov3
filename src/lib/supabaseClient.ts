import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pzifcyixpavjgjrwdveb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6aWZjeWl4cGF2amdqcndkdmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NTUwMTUsImV4cCI6MjA2NzMzMTAxNX0.5Psuz50ey1UBPJB8cp7GRa0CqynjcLLdzhofpS2megk";
export const supabase = createClient(supabaseUrl, supabaseKey);
