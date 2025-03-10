<script setup lang="ts">
import { toast } from "vue-sonner";
import ProductForm from "~/components/ProductForm.vue";
import type { TProductForm } from "~/lib/schema";
import type { Product } from "~/lib/types";

const route = useRoute();
const { id } = route.params;

const { data } = await useFetch<Product>(
  `https://api.escuelajs.co/api/v1/products/${id}`
);

const onSubmit = async (values: TProductForm) => {
  try {
    const res = await $fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: "PUT",
      body: values,
    });
    toast.success("Product updated successfully");
    navigateTo("/products");
  } catch (error) {
    console.error("Error updating product", error);
    toast.error("Failed to update product");
  }
};
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b">
    <div class="flex items-center gap-2 px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbPage>Admin</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>

  <div class="p-6">
    <ProductForm
      v-if="data"
      title="Edit Product"
      @submit="onSubmit"
      :initialData="{
        categoryId: data.category.id,
        description: data.description,
        price: data.price,
        title: data.title,
        images: data.images,
      }"
      mode="edit"
    />
  </div>
</template>
