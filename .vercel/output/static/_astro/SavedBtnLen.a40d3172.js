import{j as s}from"./jsx-runtime.391947bd.js";import{r as o}from"./index.ed373d49.js";function u(){const[n,a]=o.useState(0),t=()=>{const e=localStorage.getItem("saved-posts");if(e)try{const r=JSON.parse(e);Array.isArray(r)&&a(r.length)}catch{const d=parseInt(e,10);isNaN(d)||a(d)}else a(0)};return o.useEffect(()=>(t(),window.addEventListener("storage",t),()=>{window.removeEventListener("storage",t)}),[]),o.useEffect(()=>{const e=()=>{t()};return document.addEventListener("saved-posts-changed",e),()=>{document.removeEventListener("saved-posts-changed",e)}},[]),s.jsxs("a",{href:"/saved",className:"jbtn",children:[s.jsx("span",{children:"📁"})," ",n&&s.jsx(s.Fragment,{children:n>0&&`(${n})`})]})}export{u as default};
