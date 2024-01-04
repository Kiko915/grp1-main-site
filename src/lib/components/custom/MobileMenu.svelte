<script>
    import {page} from "$app/stores";
</script>

<nav class="mobilemenu w-full bg-gray-100 shadow">
    <ul class="mobilemenu-container">
        <li class="mobilemenu-items">
            <a href="/" aria-current="page" class="text-sm block  font-bold  p-2 {$page.url.pathname == '/' ? "text-gray-100 bg-gray-900" : "text-gray-500 hover:bg-gray-200"} text-center text-lg ">Home</a>
        </li>
        <li class="mobilemenu-items">
            <a href="/about" aria-current="page" class="text-sm block  font-bold  p-2 {$page.url.pathname == '/about' ? "text-gray-100 bg-gray-900" : "text-gray-500 hover:bg-gray-200"} text-center text-lg">About</a>
        </li>
        <li class="mobilemenu-items">
            <a href="/members" aria-current="page" class="text-sm block  font-bold  p-2 {$page.url.pathname == '/members' ? "text-gray-100 bg-gray-900" : "text-gray-500 hover:bg-gray-200"} text-center text-lg">Members</a>
        </li>
    </ul>
</nav>