
import { TCategory } from "../types/type";

interface CategoryResponse {
  success: boolean;
  data: TCategory[];
}

export async function getCategories(): Promise<TCategory[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is not configured");
  }

  const res = await fetch(`${apiUrl}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result: CategoryResponse = await res.json();

  if (!result.success) {
    throw new Error("Failed to load categories");
  }

  return result.data;
}
