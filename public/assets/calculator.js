(()=>{
const groups=[
 {key:'style',title:'Выберите визуальный стиль',options:[['Сказочная 3D-анимация','Объёмные персонажи и мягкая сказочная атмосфера'],['Реализм','Фотореалистичные и кинематографичные сцены'],['Предметная съёмка','Фотосессия товаров'],['Другой стиль','Есть особая задумка? Обсудим её вместе']]},
 {key:'media',title:'Фото или видео?',options:[['Фото',''],['Видео','']]},
 {key:'qty',title:'Сколько видео хотите?',options:[]},
 {key:'duration',title:'Длительность каждого видео',options:[['До 30 секунд',''],['До 60 секунд',''],['До 90 секунд',''],['Более 90 секунд','']]},
 {key:'script',title:'Сценарий',options:[['Нужна помощь со сценарием',''],['Сценарий готов','']]}
];
const selected={style:'Сказочная 3D-анимация',media:'Видео',qty:'1 видео',duration:'До 60 секунд',script:'Нужна помощь со сценарием'};
const root=document.getElementById('questions'),fields={};
let lastVideoQty='1 видео',lastPhotoQty='20 фото';
const product=()=>selected.style==='Предметная съёмка',photo=()=>product()&&selected.media==='Фото',pending=()=>product()&&!selected.media;
function optionsForQuantity(){return photo()?['20 фото','30 фото','40 фото','50 фото']:['1 видео','3 видео','5 видео','10 видео']}
function choose(key,value){
 if(selected[key]===value)return;
 if(key==='qty'){if(photo())lastPhotoQty=value;else lastVideoQty=value;}
 if(key==='style'){
  const wasPhoto=photo();selected.style=value;selected.media=product()?null:'Видео';
  if(!product()&&wasPhoto)selected.qty=lastVideoQty;
 }else if(key==='media'){
  selected.media=value;selected.qty=photo()?lastPhotoQty:lastVideoQty;
 }else selected[key]=value;
 render();
}
function option(g,name,desc=''){
 const b=document.createElement('button');b.type='button';b.className='option';b.dataset.value=name;b.setAttribute('aria-pressed',String(selected[g.key]===name));b.append(document.createTextNode(name));
 if(desc){const sm=document.createElement('small');sm.textContent=desc;b.append(sm)}
 b.addEventListener('click',()=>choose(g.key,name));return b;
}
groups.forEach(g=>{const field=document.createElement('div');field.className='field';field.dataset.question=g.key;field.setAttribute('role','group');field.setAttribute('aria-labelledby','label-'+g.key);const label=document.createElement('div');label.className='field-label';label.id='label-'+g.key;const options=document.createElement('div');options.className='options'+(['qty','duration'].includes(g.key)?' four':'');field.append(label,options);fields[g.key]={field,label,options};root.append(field);if(g.key!=='qty')g.options.forEach(([n,d])=>options.append(option(g,n,d)))});
function summaryLines(){return [['Стиль',selected.style],...(product()&&selected.media?[['Формат',selected.media]]:[]),...(!pending()?[['Количество',selected.qty]]:[]),...(!photo()&&!pending()?[['Длительность каждого видео',selected.duration],['Сценарий',selected.script]]:[])]}
function summaryText(){return summaryLines().map(([label,value])=>label+': '+value).join(' · ')}
function render(){
 fields.media.field.hidden=!product();fields.qty.field.hidden=pending();fields.duration.field.hidden=photo()||pending();fields.script.field.hidden=photo()||pending();
 const items=optionsForQuantity(),key=items.join('|');
 if(fields.qty.options.dataset.items!==key){fields.qty.options.replaceChildren(...items.map(n=>option(groups[2],n)));fields.qty.options.dataset.items=key}
 let number=0;groups.forEach(g=>{const f=fields[g.key];if(!f.field.hidden)f.label.textContent=String(++number).padStart(2,'0')+' / '+(g.key==='qty'&&photo()?'Сколько фото нужно?':g.title);f.options.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===selected[g.key])))});
 const price=MistyPricing.price(selected),text=price===null?'Выберите формат':'от '+price.toLocaleString('ru-RU')+' ₽';
 document.getElementById('price').textContent=text;
 const summary=document.getElementById('summary');summary.replaceChildren();summaryLines().forEach(([label,value])=>{const row=document.createElement('div'),key=document.createElement('span'),val=document.createElement('strong');key.textContent=label;val.textContent=value;row.append(key,val);summary.append(row)});
 document.getElementById('lead-order').textContent=summaryText()+' · '+text;
 document.getElementById('discuss').href='https://t.me/misty_ai_support?text='+encodeURIComponent('Здравствуйте! Хочу обсудить проект с MISTY AI.\n'+summaryText()+'\nПредварительная стоимость: '+text);
}
render();
const toggle=document.getElementById('request-open'),section=document.getElementById('application'),form=document.getElementById('lead-form'),status=document.getElementById('lead-status');
toggle.addEventListener('click',()=>{section.hidden=false;toggle.setAttribute('aria-expanded','true');section.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});form.querySelector('[name=name]').focus({preventScroll:true})});
const phone=form.querySelector('[name=phone]'),email=form.querySelector('[name=email]'),telegram=form.querySelector('[name=telegram]'),preferred=form.querySelector('[name=preferredContact]');
function contactValidity(){
 const method=preferred.value,p=phone.value.trim(),e=email.value.trim(),t=telegram.value.trim();
 phone.setCustomValidity('');email.setCustomValidity('');telegram.setCustomValidity('');
 phone.required=['Звонок','WhatsApp'].includes(method);email.required=method==='E-mail';telegram.required=method==='Telegram';
 document.getElementById('telegram-contact').hidden=method!=='Telegram';
 if(phone.required&&!p)phone.setCustomValidity('Для звонка или WhatsApp укажите телефон.');
 else if(p&&p.replace(/\D/g,'').length<7)phone.setCustomValidity('Проверьте номер телефона.');
 if(email.required&&!e)email.setCustomValidity('Для ответа по e-mail укажите адрес почты.');
 if(method==='Telegram'&&t&&!/^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(t))telegram.setCustomValidity('Укажите Telegram-ник, например @username.');
 if(method==='Telegram'&&!t)telegram.setCustomValidity('Укажите ник, по которому мы сможем написать вам в Telegram.');
 if(!p&&!e&&!(method==='Telegram'&&t)){if(!phone.required&&!email.required&&!telegram.required)phone.setCustomValidity('Укажите телефон или e-mail.');}
}
[phone,email,telegram].forEach(el=>el.addEventListener('input',contactValidity));preferred.addEventListener('change',contactValidity);contactValidity();
const privacy=document.getElementById('privacy-link');privacy.href=PRIVACY_POLICY_URL;
if(PRIVACY_POLICY_URL==='PRIVACY_POLICY_URL')privacy.addEventListener('click',e=>{e.preventDefault();status.textContent='Ссылка на политику конфиденциальности пока не предоставлена студией. Уточните её в Telegram.'});
form.addEventListener('submit',async e=>{
 e.preventDefault();contactValidity();if(!form.reportValidity())return;
 if(MistyPricing.price(selected)===null){status.textContent='Сначала выберите формат проекта в калькуляторе.';return;}
 if(location.protocol==='file:'){status.textContent='Для отправки заявки откройте опубликованный сайт. Локальный HTML подходит для просмотра дизайна и расчёта.';return;}
 const button=form.querySelector('[type=submit]');button.disabled=true;status.textContent='Отправляем заявку…';
 try{
  const raw=Object.fromEntries(new FormData(form));
  if(raw.website){status.textContent='Не удалось отправить заявку. Повторите попытку.';return;}
  const payload={name:raw.name.trim(),...(raw.email.trim()?{email:raw.email.trim()}:{}),'Телефон':raw.phone.trim()||'Не указан','Удобный способ связи':raw.preferredContact,...(raw.preferredContact==='Telegram'?{'Telegram':raw.telegram.trim()}:{}),'Компания/бренд':raw.company.trim()||'Не указана','Задача/материалы':raw.comment.trim()||'Не указаны','Желаемый срок запуска':raw.deadline||'Не указан','Параметры проекта':summaryText(),'Предварительная стоимость':'от '+MistyPricing.price(selected).toLocaleString('ru-RU')+' ₽','Согласие на обработку данных':'Да, '+new Date().toISOString(),_subject:'Новая заявка с сайта MISTY AI',_template:'table',_captcha:'false',_honey:raw.website};
  // Existing owner-approved email delivery. CRM_WEBHOOK_URL is deliberately NOT called.
  const response=await fetch(MISTY_EMAIL_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(30000)});
  const result=await response.json().catch(()=>({}));
  if(/activat|confirm.*email|verify.*email/i.test(String(result.message||'')))throw new Error('Приём заявок ещё не активирован владельцем сайта. Пока напишите нам в Telegram.');
  if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Не удалось передать заявку. Попробуйте позже или напишите нам в Telegram.');
  status.textContent='Заявка передана для отправки на email студии. Мы свяжемся с вами выбранным способом.';form.reset();contactValidity();
 }catch(error){status.textContent=error.name==='TimeoutError'?'Сервис не ответил вовремя. Попробуйте позже или напишите нам в Telegram.':error.message;}finally{button.disabled=false;}
});
})();
