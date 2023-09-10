import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://fhcypsstothlyammqrvm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoY3lwc3N0b3RobHlhbW1xcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczNzg0NzYsImV4cCI6MjAwMjk1NDQ3Nn0.hLjJdzbslh4KDBUD9I1KVo7r094H_GKAHpzP3MinDtU",
);
