const activities = [
  "🏆 Won ranked match",
  "🎁 Unlocked achievement",
  "⚔ Completed daily quest",
];


export default function ActivityPanel(){

return (

<div
className="
rounded-2xl
bg-surface
p-6
"
>

<h3 className="text-xl font-semibold">
Recent Activity
</h3>


<div className="mt-5 space-y-3">

{
activities.map((item)=>(
<p
key={item}
className="
text-foreground/70
"
>
{item}
</p>
))
}


</div>


</div>

)

}