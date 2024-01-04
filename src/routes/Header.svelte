<script>
	import logo from "$lib/images/android-chrome-512x512.png";
	import {page} from "$app/stores";
	import UserMenu from "$lib/components/custom/UserMenu.svelte";
  import { Toggle } from "$lib/components/ui/toggle";
  import { Menu } from "lucide-svelte";
  import MobileMenu from "$lib/components/custom/MobileMenu.svelte";

  let isMenuOpen = false;
</script>

<header class="py-2 px-6 border border-gray-200 bg-gray-100 flex items-center">
	<div class="branding">
		<img src={logo} alt="Portfolio Logo" class="w-12 h-12">
	</div>
	<nav class="nav-navigation ml-6 flex items-center justify-between w-full">
		<div class="large-menu lg:block hidden">
		<ul class="nav-items flex justify-between gap-2">
			<li class="nav-links">
				<a href="/" aria-current="page" class="text-sm  font-bold  p-2 {$page.url.pathname == '/' ? "text-gray-100 bg-gray-900" : "text-gray-500"} rounded">Home</a>
			</li>
			<li class="nav-links">
				<a href="/about" aria-current="page" class="text-sm  font-bold  p-2 {$page.url.pathname == '/about' ? "text-gray-100 bg-gray-900" : "text-gray-500"} rounded">About</a>
			</li>
			<li class="nav-links">
				<a href="/members" aria-current="page" class="text-sm  font-bold  p-2 {$page.url.pathname == '/members' ? "text-gray-100 bg-gray-900" : "text-gray-500"} rounded">Members</a>
			</li>
		</ul>	
		</div>
		
		<div class="user-container lg:block hidden">
			<UserMenu />
		</div>
		<div class="mobileMenuBtn-container lg:hidden">
			<Toggle variant="outline" aria-label="Toggle italic" on:click={() => (isMenuOpen = !isMenuOpen)}>
				<Menu />
			  </Toggle>
		</div>
	</nav>
	
</header>
<!--mobile menu-->
<div class="no-mobilemenuonlg lg:hidden">
	{#if isMenuOpen}
		<MobileMenu />
	{/if}
</div>


