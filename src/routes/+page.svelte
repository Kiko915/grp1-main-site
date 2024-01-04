<script lang="ts">
  import { goto } from "$app/navigation";
  import Card from "$lib/components/custom/Card.svelte";
  import ParticleBanner from "$lib/components/custom/ParticleBanner.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { Upload } from "lucide-svelte";
  import auth from "$lib/store/user";
  import { onMount } from "svelte";
  import { db } from "$lib/utils/appwrite";

  let projectsArr: any[] = [];

async function handleUpload() {
	if($auth.isAuthenticated) {
		// create a new project
		goto('/upload');
	} else {
		goto('/login');
	}
}

async function listProjects() {
	const projects = await db.listDocuments('6596cf66783107c93d3e', '6596cf784286e8c6605c');
	projectsArr = projects.documents;
	console.log(projects);
}

onMount(() => {
	listProjects();
})
</script>

<svelte:head>
	<title>Group Portfolio | Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="main-section">
	<ParticleBanner /> 

	<main id="card-list" class="py-4 grid xl:grid-cols-4 md:grid-cols-3 gap-2 grid-cols-1">
		{#each projectsArr as project}
			<Card authorName={project["author-name"]} keyId={project["$id"]}  currentReactors={project["reactors"]} imageId={project["project-image"]} />
		{/each}	
		
	</main>
	<Separator />
	<!--upload section-->
	<div class="uploader text-right">
		<Button class="mt-4 hover:shadow-md" on:click={handleUpload}>
			<Upload class="w-4 h-4 mr-2" />
			Upload Your Project
		</Button>
	</div>
	
</section>