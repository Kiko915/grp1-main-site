<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Tabs from "$lib/components/ui/tabs";
  import coverPhoto from "$lib/images/login-bg.jpg";
  import auth from "$lib/store/user";
  import { account, ID } from '$lib/utils/appwrite';
  import { toast } from "svelte-sonner";

  let loggedInUser = null;

  
// @ts-ignore
async function login(email, password) {
  try {
    await account.createEmailSession(email, password);
    loggedInUser = await account.get();
    console.log(loggedInUser);
    // @ts-ignore
    auth.set({ user: loggedInUser, isAuthenticated: true });
    if(loggedInUser) {
      toast.success("Welcome " + $auth.user.name + "!");
      goto('/');
    }
  } catch (error) {
    toast.error("Login error: " + error);
    console.error('Login failed', error);
  }
    
}


//@ts-ignore
async function register(email, password, name) {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
}

  // @ts-ignore
  function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const type = e.submitter.dataset.type;
        if (type === "login") {
            login(formData.get('email'), formData.get('password'));
        } else if (type === "register") {
            console.log(formData.get('new-email'));
            register(formData.get('new-email'), formData.get('new-password'), formData.get('new-username'));
        }
    }
</script>
<main id="login-screen-container" class="flex rounded-md shadow overflow-hidden">
    <div class="image-section h-full w-full bg-slate-200 lg:block hidden">
        <img src={coverPhoto} alt="login cover">
    </div>
    <div class="main-panel h-full w-full p-4 flex justify-center items-center">
        <Tabs.Root value="account" class="w-[400px]">
            <Tabs.List class="w-full">

              <Tabs.Trigger value="login">Login</Tabs.Trigger>
              <Tabs.Trigger value="register">Register</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="login">
                <Card.Root>
                    <Card.Header>
                      <Card.Title>Log In</Card.Title>
                      <Card.Description>
                        Login to your account to view your profile and upload your projects.
                      </Card.Description>
                    </Card.Header>
                    <form on:submit={submit}>
                    <Card.Content class="space-y-2">
                      <div class="space-y-1">
                        <Label for="email">Email</Label>
                        <Input id="email" name="email" type="email" required/>
                      </div>
                      <div class="space-y-1">
                        <Label for="password">Password</Label>
                        <Input id="password" name="password" type="password" required/>
                      </div>
                    </Card.Content>
                    <Card.Footer>
                      <Button type="submit" data-type="login">Login</Button>
                    </Card.Footer>
                    </form>
                  </Card.Root>
            </Tabs.Content>
            <Tabs.Content value="register">
                <Card.Root>
                    <Card.Header>
                      <Card.Title>Register</Card.Title>
                      <Card.Description>
                        Register now! To be able to upload projects.
                      </Card.Description>
                    </Card.Header>
                    <form on:submit={submit}>
                    <Card.Content class="space-y-2">
                      <div class="space-y-1">
                        <Label for="new-username">Username</Label>
                        <Input id="new-username" name="new-username" type="text" required />
                      </div>
                      <div class="space-y-1">
                        <Label for="new-email">Email</Label>
                        <Input id="new-email" name="new-email" type="email" required />
                      </div>
                      <div class="space-y-1">
                        <Label for="new-password">Password</Label>
                        <Input id="new-password" name="new-password" type="password" required  minlength={8}/>
                      </div>
                    </Card.Content>
                    <Card.Footer>
                      <Button type="submit" data-type="register">Register</Button>
                    </Card.Footer>
                  </form>
                  </Card.Root>
            </Tabs.Content>
          </Tabs.Root>
          
          
    </div>
</main>