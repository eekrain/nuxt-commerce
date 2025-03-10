<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  type SidebarProps,
  SidebarRail,
} from "@/components/ui/sidebar";

const props = defineProps<SidebarProps>();

const user = ref({
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
});

// This is sample data.
const route = useRoute();

const data = {
  navMain: [
    {
      title: "Admin",
      url: "#",
      items: [
        {
          title: "Dasboard",
          url: "/",
        },
        {
          title: "Products",
          url: "/products",
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <h1 class="font-semibold text-xl">EKA Shop</h1>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
            <SidebarMenuButton as-child>
              <a :href="item.url" class="font-medium">
                {{ item.title }}
              </a>
            </SidebarMenuButton>
            <SidebarMenuSub v-if="item.items.length">
              <SidebarMenuSubItem
                v-for="childItem in item.items"
                :key="childItem.title"
              >
                <SidebarMenuSubButton
                  as-child
                  :is-active="route.path === childItem.url"
                >
                  <a :href="childItem.url">{{ childItem.title }}</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
