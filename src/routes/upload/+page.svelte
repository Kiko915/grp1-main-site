<script>
// @ts-nocheck

  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import { ID, db, account, storage } from "$lib/utils/appwrite";
  import {toast} from "svelte-sonner";
  import auth from "$lib/store/user";

  // @ts-ignore
  let selectedFile;

  function handleFileChange(event) {
    selectedFile = event.target.files[0];
  }
    // @ts-ignore
    async function uploadProject(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            console.log(`project-title: ${formData.get("project-title")}
            project-link: ${formData.get("project-link")}`);
            // @ts-ignore

            // Upload file to Appwrite Storage
            const filePromise = storage.createFile('6596d0e93ed2f0b0f30e', ID.unique(), selectedFile);
            const fileData = await filePromise;

            const project = await db.createDocument("6596cf66783107c93d3e","6596cf784286e8c6605c",ID.unique(),{"portfolio-title": formData.get("project-title"), "portfolio-description": formData.get("project-description"), "portfolio-link": formData.get("project-link"), "author-email": $auth.user.email, "author-name": $auth.user.name, "project-image": fileData["$id"]});
            
            toast.success("Project created successfully");
            goto("/");
        } catch (e) {
            console.log("There was an error creating the project!", e);
            toast.error("There was an error creating the project");
        }
        
    }

    console.log($auth.user);
</script>
<svelte:head>
    <title>Group Portfolio | Upload</title>
</svelte:head>
<main class="upload-container">
    <Card.Root>
    <form on:submit={uploadProject} >
      <Card.Header>
        <Card.Title>Upload Project</Card.Title>
        <Card.Description>Provide the required information to upload your project.</Card.Description>
      </Card.Header>
      <Card.Content>
            <Label for="project-title">Project Title</Label>
            <Input type="text" name="project-title" required/>
            <Separator />
            <Label for="project-description">Project Description</Label>
            <Textarea name="project-description" maxlength={100}/>
            <Separator />
            <Label for="project-link">Project Link</Label>
            <Input type="text" name="project-link" required/>
            <Separator />
            <Label for="project-image">Project Image</Label>
            <Input type="file" name="project-image" accept="image/png, image/jpeg" on:change={handleFileChange} required/>
            <Separator />   
      </Card.Content>
      <Card.Footer>
        <Button type="submit" class="w-full md:w-auto">Upload</Button>
      </Card.Footer>
    </form>
    </Card.Root>
</main>