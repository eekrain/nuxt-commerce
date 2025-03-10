import { type Category, type Product } from "~/lib/types";

interface ProductFilters {
  title?: string;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
}

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const categories = ref<Category[]>([]);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Pagination state
  const currentPage = ref(1);
  const itemsPerPage = ref(5);
  const hasMore = ref(true);

  // Filter state
  const filters = ref<ProductFilters>({});

  const fetchProducts = async (page: number = 1) => {
    isLoading.value = true;
    error.value = null;
    currentPage.value = page;

    try {
      const queryParams = new URLSearchParams();

      queryParams.append("offset", `${(page - 1) * itemsPerPage.value}`);
      queryParams.append("limit", itemsPerPage.value.toString());

      // Filters
      if (filters.value.title) queryParams.append("title", filters.value.title);

      if (filters.value.price_min)
        queryParams.append("price_min", filters.value.price_min.toString());

      if (filters.value.price_max) {
        queryParams.append("price_max", filters.value.price_max.toString());
        if (!filters.value.price_min) queryParams.append("price_min", "1");
      }

      if (filters.value.categoryId)
        queryParams.append("categoryId", filters.value.categoryId.toString());

      const response = await $fetch<Product[]>(
        `https://api.escuelajs.co/api/v1/products?${queryParams.toString()}`
      );

      products.value = response;
      hasMore.value = response.length === itemsPerPage.value;
    } catch (err) {
      error.value = "Failed to fetch products";
      console.error("Error fetching products:", err);
    } finally {
      isLoading.value = false;
    }
  };

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

  const updateFilters = async (newFilters: Partial<ProductFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
    await fetchProducts(1);
  };

  const clearFilters = async () => {
    filters.value = {};
    await fetchProducts(1);
  };

  return {
    products,
    categories,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    hasMore,
    filters,
    fetchProducts,
    fetchCategories,
    updateFilters,
    clearFilters,
  };
};
