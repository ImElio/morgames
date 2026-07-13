import AuthCard from "@/components/auth/AuthCard";


export default function RegisterPage(){

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
title="Create account"
description="Join the gaming community"
>


<form className="space-y-5">


<div>

<label className="text-sm text-foreground/70">
Username
</label>

<input
placeholder="Your nickname"
className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-background
px-4
py-3
outline-none
focus:border-primary
text-foreground
"
/>

</div>



<div>

<label className="text-sm text-foreground/70">
Email
</label>

<input
placeholder="email@example.com"
className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-background
px-4
py-3
outline-none
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
outline-none
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
hover:opacity-90
"
>
Create account
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
Already have an account?
{" "}
<span className="text-primary cursor-pointer">
Login
</span>
</p>


</AuthCard>


</main>

)

}