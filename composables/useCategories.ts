import { type Category, type Product } from "~/lib/types";

interface ProductFilters {
  title?: string;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
}

export const useCategories = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const categories = ref<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await $fetch<Category[]>(
        "https://api.escuelajs.co/api/v1/categories"
      );
      categories.value = response;
    } catch (err) {
      error.value = "Failed to fetch categories";
      console.error("Error fetching categories:", err);
    }
  };

  return {
    categories,
    fetchCategories,
    isLoading,
    error,
  };
};
