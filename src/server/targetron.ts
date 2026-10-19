import { createServerFn } from "@tanstack/react-start";

export interface TargetronLead {
  name: string;
  category: string;
  website: string;
  domain: string;
  phone: string;
  email?: string;
  full_name?: string;
  title?: string;
  contact_linkedin?: string;
  company_employees?: string;
  rating?: number;
  reviews?: number;
  cid?: string;
  address?: string;
}

export async function fetchTargetronLeads(query: string, limit = 20): Promise<TargetronLead[]> {
  const apiKey = process.env.TARGETRON_API_KEY;

  if (!apiKey) {
    throw new Error("TARGETRON_API_KEY is not configured in environment variables.");
  }

  const response = await fetch("https://api.targetron.cloud/businesses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({
      query,
      limit,
      fields: [
        "name", "category", "website", "domain", "phone",
        "email", "full_name", "title", "contact_linkedin",
        "company_employees", "rating", "reviews", "cid", "address"
      ]
    }),
  });

  if (!response.ok) {
    throw new Error(`Targetron API error: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();

  if (
    typeof data === "object" &&
    data !== null &&
    "items" in data &&
    Array.isArray(data.items)
  ) {
    return data.items as TargetronLead[];
  }

  throw new Error("Unexpected Targetron API response format.");
}

// TanStack Start Server Function callable directly from any UI component
export const getTargetronLeadsFn = createServerFn({ method: "GET" })
  .validator((query: string) => query)
  .handler(async ({ data }) => {
    return await fetchTargetronLeads(data || "Plumbers in Austin TX", 5);
  });