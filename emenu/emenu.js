const SESSION_KEY='emenu-demo-session';
const sevenDays=7*24*60*60*1000;
const getSession=()=>{try{const value=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');return value&&value.expires>Date.now()?value:null}catch{return null}};
const setSession=(name,email)=>localStorage.setItem(SESSION_KEY,JSON.stringify({name:name||email.split('@')[0],email,expires:Date.now()+sevenDays}));
const message=(text)=>{const target=document.querySelector('[data-form-message]');if(target){target.textContent=text;target.classList.add('show')}};
const goHome=()=>setTimeout(()=>location.href='index.html',900);
document.querySelector('[data-signup-form]')?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);setSession(data.get('name'),data.get('email'));message('Your demo account is ready. Opening E-menu…');goHome()});
document.querySelector('[data-login-form]')?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);setSession('',data.get('email'));message('Demo session started for seven days. Opening E-menu…');goHome()});
document.querySelector('[data-reset-form]')?.addEventListener('submit',event=>{event.preventDefault();message('Demo mode: OTP delivery requires the production email API. We would send a reset OTP to this email.');});
const accountSlot=document.querySelector('[data-account-slot]');const current=getSession();if(accountSlot&&current){const first=current.name.trim().split(/\s+/)[0];accountSlot.innerHTML=`<a class="profile-pill" href="dashboard.html" title="Demo account: ${current.email}">👤 ${first}</a>`}
const dashboard=document.querySelector('[data-dashboard]');
if(dashboard){const copy=dashboard.querySelector('[data-dashboard-copy]');if(current){copy.textContent=`Welcome, ${current.name}. Your demo session remains active for seven days from sign-in.`}else{copy.textContent='Please log in or create an account to open your E-menu workspace.';setTimeout(()=>location.href='login.html',1100)}}
document.querySelector('[data-logout]')?.addEventListener('click',()=>{localStorage.removeItem(SESSION_KEY);location.href='index.html'});
