import AuthCard from "@/components/auth/AuthCard";


export default function LoginPage(){

return (

<main
className="
min-h-screen
flex
items-center
justify-center
bg-background
px-6
"
>


<AuthCard
title="Welcome back"
description="Login to continue your gaming experience"
>


<form className="space-y-5">


<div>

<label className="text-sm text-foreground/70">
Email
</label>

<input
type="email"
placeholder="player@example.com"
className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-background
px-4
py-3
text-sm
outline-none
transition
focus:border-primary
text-foreground
"
/>

</div>



<div>

<label className="text-sm text-foreground/70">
Password
</label>

<input
type="password"
placeholder="••••••••"
className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-background
px-4
py-3
text-sm
outline-none
transition
focus:border-primary
text-foreground
"
/>

</div>



<button
className="
w-full
rounded-xl
bg-primary
py-3
font-semibold
text-white
transition
hover:opacity-90
"
>
Login
</button>


</form>


<p
className="
mt-6
text-center
text-sm
text-foreground/60
"
>
Don&apos;t have an account?
{" "}
<span className="text-primary cursor-pointer">
Create one
</span>
</p>


</AuthCard>


</main>

)

}