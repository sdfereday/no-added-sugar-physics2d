export default{create:(e=(Number(String(Math.random()).slice(2))+Date.now()+Math.round(performance.now())).toString(36))=>{let a=[];const t=()=>a.map(e=>e),r=()=>a.map(({value:e})=>e);return{id:e,items:t,keys:()=>a.map(({key:e})=>e),values:r,get:e=>(e=>void 0!==e?{...e}:null)(a.filter(a=>a.key===e)[0]),query:(e=[])=>e.map(e=>e(r())),add:(e,t)=>!a.some(a=>a.key===e)&&a.push({key:e,value:t}),remove:e=>a=a.filter(({key:a})=>e!==a),flush:()=>a.splice(0,a.length),update:(e,t,r)=>{a=a.map(a=>a.key===e?{...a,value:{...a.value,[t]:r}}:{...a})},export:()=>JSON.stringify(t()),import:e=>a=JSON.parse(e).map(e=>e)}}};