import { map } from "nanostores";

export const activeFilters = map({
  author: null as string | null,
  category: null as string | null,
  mood: null as string | null,
  brand: null as string | null,
  searchTerm: "",
});
