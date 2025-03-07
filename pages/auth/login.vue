<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema } from "~/lib/schema";
import { useAuth } from "~/composables/useAuth";

const formSchema = toTypedSchema(loginSchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: "admin@mail.com",
    password: "",
  },
});

const { login } = useAuth();

const onSubmit = form.handleSubmit(async (values) => {
  console.log("Form submitted!", values);

  try {
    await login(values.email, values.password);
    navigateTo("/dashboard"); // Redirect after login
  } catch (error) {
    console.error("Login failed", error);
  }
});
</script>

<template>
  <Card class="w-[400px]">
    <CardHeader class="text-center">
      <CardTitle class="text-3xl">Login</CardTitle>
      <CardDescription class="text-balance text-muted-foreground">
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <div class="grid items-center w-full gap-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="admin@mail.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full mt-4">Login</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
