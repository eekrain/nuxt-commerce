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
import { toast } from "vue-sonner";

import ProductForm from "~/components/ProductForm.vue";
import type { TProductForm } from "~/lib/schema";

const onSubmit = async (values: TProductForm) => {
  console.log("🚀 ~ onSubmit ~ values:", values);
  try {
    const res = await $fetch("https://api.escuelajs.co/api/v1/products/", {
      method: "POST",
      body: values,
    });
    toast.success("Product created successfully");
    navigateTo("/products");
  } catch (error) {
    console.error("Error creating product", error);
    toast.error("Failed to create product");
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
            <BreadcrumbLink href="#"> Admin </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Product</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>New Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>

  <div class="p-6">
    <ProductForm title="Create New Product" @submit="onSubmit" mode="create" />
  </div>
</template>
