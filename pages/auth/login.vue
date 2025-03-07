<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
</script>

<template>
  <div class="w-full min-h-screen lg:grid lg:grid-cols-2 bg-muted">
    <div class="flex items-center justify-center py-12 px-4">
      <Card class="w-[400px]">
        <CardHeader class="text-center">
          <CardTitle class="text-3xl">Login</CardTitle>
          <CardDescription class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div class="grid items-center w-full gap-4">
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>

              <Button type="submit" class="w-full mt-4"> Login </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    <div class="hidden lg:block">
      <img
        src="/login-illustration.svg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
