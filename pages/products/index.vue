<script setup lang="ts">
definePageMeta({ middleware: "protected" });

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Edit,
  Trash2,
} from "lucide-vue-next";
import ProductCard from "~/components/ProductCard.vue";
import { toast } from "vue-sonner";

const { categories, fetchCategories } = useCategories();

const {
  products,
  isLoading,
  error,
  currentPage,
  hasMore,
  fetchProducts,
  updateFilters,
  clearFilters,
  deleteProduct,
} = useProducts();

// Filter state
const searchTitle = ref("");
const minPrice = ref("");
const maxPrice = ref("");
const categoryId = ref("");

function prevPage() {
  if (currentPage.value > 1) {
    fetchProducts(currentPage.value - 1);
  }
}

function nextPage() {
  if (hasMore.value) {
    fetchProducts(currentPage.value + 1);
  }
}

async function applyFilters() {
  const newFilters: Record<string, any> = {};

  if (searchTitle.value) newFilters.title = searchTitle.value;
  if (minPrice.value) newFilters.price_min = Number(minPrice.value);
  if (maxPrice.value) newFilters.price_max = Number(maxPrice.value);
  if (categoryId.value) newFilters.categoryId = Number(categoryId.value);

  await updateFilters(newFilters);
}

async function resetFilters() {
  searchTitle.value = "";
  minPrice.value = "";
  maxPrice.value = "";
  categoryId.value = "";
  await clearFilters();
}

// Initial fetch
onMounted(() => {
  fetchProducts(1);
  fetchCategories();
});
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b">
    <div class="flex items-center gap-2 px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="#"> Admin </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>

  <div class="p-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Products</h1>

      <NuxtLink to="/products/new">
        <Button>
          <Plus />
          <span>New Product</span>
        </Button>
      </NuxtLink>
    </div>

    <!-- Filter Section -->
    <Card class="max-w-lg my-6">
      <CardContent class="pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Search by Title</label>
            <Input
              v-model="searchTitle"
              placeholder="Search products..."
              @keyup.enter="applyFilters"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Category</label>
            <Select v-model="categoryId">
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    >{{ category.name }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Min Price</label>
            <Input
              v-model="minPrice"
              type="number"
              placeholder="Min price"
              @keyup.enter="applyFilters"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Max Price</label>
            <Input
              v-model="maxPrice"
              type="number"
              placeholder="Max price"
              @keyup.enter="applyFilters"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter class="gap-4">
        <Button variant="outline" @click="resetFilters">Reset</Button>

        <Button @click="applyFilters">
          <Search />
          <span> Start Filtering </span>
        </Button>
      </CardFooter>
    </Card>

    <div
      v-if="isLoading"
      class="flex justify-center items-center min-h-[400px]"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
      />
    </div>

    <div
      v-else-if="error"
      class="flex justify-center items-center min-h-[400px]"
    >
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div
      v-else-if="products.length === 0"
      class="flex justify-center items-center min-h-[400px]"
    >
      <p class="text-muted-foreground">No products found.</p>
    </div>

    <div
      v-else
      class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :deleteProduct="deleteProduct"
      />
    </div>

    <div class="flex justify-center items-center gap-2 mt-8">
      <Button
        size="icon"
        variant="outline"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

      <span class="min-w-[3rem] text-center">
        {{ currentPage }}
      </span>

      <Button
        size="icon"
        variant="outline"
        @click="nextPage"
        :disabled="!hasMore"
      >
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
