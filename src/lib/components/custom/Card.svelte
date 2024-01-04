<script lang='ts'>
  import { db, storage } from "$lib/utils/appwrite";
    import AspectRatio from "../ui/aspect-ratio/aspect-ratio.svelte";
    import * as Avatar from "../ui/avatar/";
    import Button from "../ui/button/button.svelte";

    export let reacts = 0;
    export let authorName = "";
    export let cardImg = "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";
    export let keyId = "";
    export let projectLink = "";
    export let imageId = "";
    
     export let currentReactors: any[] = [];

    let clicked = false;

    const result = storage.getFilePreview('6596d0e93ed2f0b0f30e', imageId);
    console.log(result?.pathname); // Resource URL

    async function handleReactions() {
        clicked = !clicked;
        // const toggle = currentReactors + 1;  
        db.updateDocument('6596cf66783107c93d3e', '6596cf784286e8c6605c', keyId, {"reactors": []});
        console.log(currentReactors.length);
    }
</script>

<div class="mt-3">
    <div class="lg:w-[300px] w-full">
        <a href={"/projects/" + keyId}>
        <AspectRatio ratio={2 / 2}>
            <img
            src={result.href}
            alt="Gray by Drew Beamer"
            class="rounded-md object-cover h-full w-full hover:shadow-md hover:-translate-y-2 transition-all"
          />
        </AspectRatio>
        </a>
        <div class="bottom-section mt-1 flex items-center justify-between">
            <div class="user-info flex items-center gap-2">
                <div class="sizeable w-5 h-5">
                <Avatar.Root class="w-6 h-6">
                    <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
                    <Avatar.Fallback>CN</Avatar.Fallback>
                </Avatar.Root>
                </div>
                <span id="username" class="block text-sm font-semibold text-muted-foreground">{authorName}</span>
            </div>
            <div class="social-actions flex items-center">
                <span class="text-muted-foreground text-sm">{reacts}</span>
                <Button variant="ghost" size="icon" on:click={handleReactions}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={clicked ? "red" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart rounded-full"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </Button>
            </div>
        </div>
        
        
        
    </div>
</div>