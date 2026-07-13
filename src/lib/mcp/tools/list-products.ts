import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List products from the shop's catalog. Optionally filter by a search term matched against product name and description.",
  inputSchema: {
    search: z
      .string()
      .trim()
      .optional()
      .describe("Optional search term matched against name/description."),
    limit: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Max rows to return (defaults to 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ search, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated" }],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase.from("products").select("*").limit(limit ?? 20);
    if (search && search.length > 0) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }
    const { data, error } = await query;
    if (error) {
      return {
        content: [{ type: "text", text: error.message }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { products: data ?? [] },
    };
  },
});