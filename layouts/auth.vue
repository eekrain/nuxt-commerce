<template>
  <div class="w-full min-h-screen lg:grid lg:grid-cols-2 bg-muted">
    <div class="flex items-center justify-center py-12 px-4">
      <slot />
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
