<script lang="ts">
    import * as DropdownMenu from "../ui/dropdown-menu";
    import * as Avatar from "../ui/avatar";
    import { ChevronDown, LogIn, LogOut, UserRound } from "lucide-svelte";
    import Button from "../ui/button/button.svelte";
    import { account } from "$lib/utils/appwrite";
  import auth from "$lib/store/user";
  import { goto } from "$app/navigation";

    async function logout() {
        await account.deleteSession('current');
        auth.set({user: null, isAuthenticated: false});
        goto('/login');
        // loggedInUser = null;
    }
</script>

<div class="parent-usermenu-container flex items-center gap-2">
    <div class="user-container-inner">
      {#if $auth.isAuthenticated}
        <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>
      {:else}
      <p>No user</p>   
      {/if}
</div>
<div class="user-menu-container">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <ChevronDown class="text-gray-500" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            {#if $auth.isAuthenticated}
            <DropdownMenu.Item>
              <span><UserRound class="w-4 text-gray-500 mr-2" /></span>
              Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item class="text-red-400" on:click={logout}><span><LogOut class="w-4 text-red-400 mr-2" /></span>Sign Out</DropdownMenu.Item>
          {:else}
          <a href="/login"><DropdownMenu.Item><span><LogIn class="w-4 text-gray-500 mr-2" /></span>Log In</DropdownMenu.Item></a>
            {/if}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
</div>
</div>
