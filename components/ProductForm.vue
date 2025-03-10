<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { productSchema, type TProductForm } from "~/lib/schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Loader } from "lucide-vue-next";

const API_URL = "https://api.escuelajs.co/api/v1";

type Props = {
  title: string;
  mode: "create" | "edit";
  initialData?: TProductForm;
  onSubmit: (data: TProductForm) => Promise<void>;
};
const props = defineProps<Props>();

const router = useRouter();
const { categories, fetchCategories } = useCategories();
const updateOpen = ref(false);
const formValues = ref<TProductForm | null>(null);
const uploadingImage = ref(false);
const imageUrls = ref<string[]>([]);

const formSchema = toTypedSchema(productSchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialData
    ? props.initialData
    : {
        images: [],
      },
});

const removeImage = (index: number) => {
  imageUrls.value.splice(index, 1);
  form.setFieldValue("images", imageUrls.value);
};

const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  try {
    uploadingImage.value = true;
    const file = input.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/files/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    imageUrls.value.push(data.location);
    form.setFieldValue("images", imageUrls.value);
  } catch (error) {
    console.error("Error uploading image:", error);
  } finally {
    uploadingImage.value = false;
  }
};

const onSubmit = form.handleSubmit(async (values) => {
  if (props.mode === "edit") {
    formValues.value = values;
    updateOpen.value = true;
  } else {
    await props.onSubmit(values);
  }
});

const confirmUpdate = async () => {
  if (formValues.value) {
    await props.onSubmit(formValues.value);
    updateOpen.value = false;
    formValues.value = null;
  }
};

onMounted(() => {
  fetchCategories();
  if (props.initialData?.images) {
    imageUrls.value = [...props.initialData.images];
  }
});
</script>

<template>
  <h1 class="text-2xl font-semibold mb-6">{{ props.title }}</h1>

  <form @submit="onSubmit">
    <div class="grid items-center max-w-lg gap-4">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Product title"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Product description"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="categoryId">
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Product price"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="image">
        <FormItem>
          <FormLabel>Images</FormLabel>
          <FormControl>
            <div class="space-y-4">
              <div class="flex gap-4">
                <div
                  v-for="(url, index) in form.values.images"
                  :key="index"
                  class="relative rounded-lg overflow-hidden"
                >
                  <img
                    :src="url"
                    alt="Product image"
                    class="size-[150px] object-cover bg-yellow-100"
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    class="absolute top-1 right-1 h-6 w-6"
                    @click="removeImage(index)"
                  >
                    <X />
                  </Button>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  :disabled="uploadingImage"
                />
                <div v-if="uploadingImage" class="animate-spin">
                  <Loader />
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex gap-4">
        <Button type="button" variant="outline" @click="router.back()">
          Cancel
        </Button>

        <Button type="submit">
          {{ props.mode === "edit" ? "Update Product" : "Create Product" }}
        </Button>
      </div>
    </div>
  </form>

  <Dialog :open="updateOpen" @update:open="updateOpen = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Product</DialogTitle>
        <DialogDescription>
          Are you sure you want to update this product?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button type="button" variant="outline" @click="updateOpen = false">
          Cancel
        </Button>
        <Button type="button" @click="confirmUpdate"> Update </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
