<script lang="ts">


    import {page} from "$app/stores";
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { db } from "$lib/utils/appwrite";
  import { onMount } from "svelte";

    interface pageDetailsType {
        "portfolio-title": string,
        "portfolio-description": string,
        "author-name": string,
        "portfolio-link": string,
    }

    let pageDetails: pageDetailsType = {
      "portfolio-title": "",
      "portfolio-description": "",
      "author-name": "",
      "portfolio-link": ""
    };

    const pageParams = $page.params.projectId;
    // @ts-ignore
    async function getProjectDetails(pageId) {
        const details = await db.getDocument('6596cf66783107c93d3e', '6596cf784286e8c6605c', pageId);
        console.log(details);
        pageDetails = {"portfolio-title": details["portfolio-title"], "portfolio-description": details["portfolio-description"], "author-name": details["author-name"], "portfolio-link": details["portfolio-link"]};
        console.log(pageDetails["portfolio-title"]);
    }
    
    onMount(() => {
        getProjectDetails(pageParams);
    })
</script>

<div class="details-page">
    <img src="" alt="">
    <span class="text-muted-foreground text-sm">ID: {pageParams}</span>
    <h2>Project Title: {pageDetails["portfolio-title"]}</h2>
    <h2>Project Description: {pageDetails["portfolio-description"]}</h2>
    <h2>Author: {pageDetails["author-name"]}</h2>
    <Separator />
    <Button href={pageDetails["portfolio-link"]} class="mt-4 md:w-auto w-full">Visit Site</Button>
</div>