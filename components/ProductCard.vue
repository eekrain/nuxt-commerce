<script setup lang="ts">
import { Edit, Trash2 } from "lucide-vue-next";
import type { Product } from "~/lib/types";

const deleteOpen = ref(false);

type Props = {
  product: Product;
  deleteProduct: (productId: number) => Promise<void>;
};
const props = defineProps<Props>();

const { fetchProducts } = useProducts();

const onDelete = async () => {
  await props.deleteProduct(props.product.id);
  deleteOpen.value = false;
};
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border bg-card text-card-foreground shadow relative flex flex-col"
    :key="product.id"
  >
    <img
      :src="`https://picsum.photos/2000/800?random=${product.id}`"
      :alt="product.title"
      class="h-[200px] object-cover"
    />
    <div class="p-6 pt-4 flex-1 flex flex-col">
      <h3 class="mb-3 text-2xl font-semibold">
        {{ product.title }}
      </h3>

      <p class="text-muted-foreground flex-1">
        Price:
        <span class="font-semibold text-emerald-600">${{ product.price }}</span>
      </p>

      <div class="flex justify-end gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                size="icon"
                type="button"
                variant="destructive"
                @click="deleteOpen = true"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete product</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <NuxtLink :to="`/products/edit/${product.id}`">
                <Button size="icon" type="button">
                  <Edit />
                </Button>
              </NuxtLink>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit product</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>

  <Dialog :open="deleteOpen" @update:open="deleteOpen = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Deleting Product</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this product?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button type="button" variant="outline" @click="deleteOpen = false">
          Cancel
        </Button>
        <Button type="button" variant="destructive" @click="onDelete">
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
