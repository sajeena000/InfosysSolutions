const a=()=>({downloadCSV:(e,o,n)=>{const c=[e.join(","),...o.map(i=>i.join(","))].join(`
`),d=new Blob([c],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(d),t=document.createElement("a");t.setAttribute("href",s),t.setAttribute("download",n),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)}});export{a as u};
