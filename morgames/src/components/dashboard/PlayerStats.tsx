export default function PlayerStats(){

return (

<div
className="
rounded-2xl
bg-surface
p-6
"
>

<h3 className="text-xl font-semibold">
Player Stats
</h3>


<div className="mt-5 space-y-4">


<div>
<p className="text-sm text-foreground/60">
Level
</p>

<p className="text-2xl font-bold">
42
</p>
</div>



<div>
<p className="text-sm text-foreground/60">
Experience
</p>

<p className="text-2xl font-bold text-secondary">
82%
</p>
<div className="h-2 w-full rounded-full bg-background">
<div
className="h-2 rounded-full bg-secondary"
style={{ width: "82%" }}
/>
</div>

</div>


</div>


</div>

)

}