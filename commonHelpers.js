import"./assets/styles-fcd3b10f.js";import{f as m,i as l}from"./assets/vendor-77e16229.js";const h=document.querySelector("[data-days]"),f=document.querySelector("[data-hours]"),y=document.querySelector("[data-minutes]"),D=document.querySelector("[data-seconds]"),r=document.querySelector("[data-start]"),S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<new Date?(l.error({title:"Error",message:"You must choose a future date"}),r.disabled=!0):r.disabled=!1}},p=m("#datetime-picker",S);function E(e){const o=Math.floor(e/864e5),n=Math.floor(e%864e5/36e5),s=Math.floor(e%864e5%36e5/6e4),i=Math.floor(e%864e5%36e5%6e4/1e3);return{days:o,hours:n,minutes:s,seconds:i}}r.addEventListener("click",function(){const e=p.selectedDates[0],c=Date.now();let t=e-c;const d=setInterval(function(){const{days:u,hours:o,minutes:n,seconds:s}=E(t);h.textContent=u>=0?a(u):"00",f.textContent=o>=0?a(o):"00",y.textContent=n>=0?a(n):"00",D.textContent=s>=0?a(s):"00",t<=0&&(clearInterval(d),l.success({title:"Success",message:"The countdown to the selected date has ended"})),t-=1e3},1e3)});function a(e){return String(e).padStart(2,"0")}r.disabled=!0;
//# sourceMappingURL=commonHelpers.js.map