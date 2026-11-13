(function(){
const works=[
 ['image','Имиджевое видео','Атмосфера пространства','01'],
 ['image','Реалистичный AI-видеостиль','Движение и реализм','02'],
 ['image','Реалистичный AI-видеостиль','Реалистичный образ','03'],
 ['cartoon','Сказочная AI-история','Скрытая правда про Золушку','04'],
 ['cartoon','Сказка с драматическим сюжетом','Трагедия Лебединого озера','05'],
 ['cartoon','Мультфильм','Визуальная история','06'],
 ['gift','Особенный повод','Ролик для гендер-пати','07'],
 ['trend','Трендовый AI-формат','Человек-паук','08']
];
const list=document.getElementById('work-list');works.forEach(([category,title,desc,id])=>{const card=document.createElement('article');card.className='work';card.dataset.category=category;card.dataset.videoId=id;card.setAttribute('aria-label','Смотреть видео: '+desc);const visual=document.createElement('div');visual.className='work-visual';const thumb=document.createElement('img');thumb.src='videos/'+id+'.jpg';thumb.alt=desc;thumb.loading='lazy';thumb.onerror=()=>{thumb.hidden=true;visual.classList.add('thumbnail-fallback')};visual.append(thumb);const overlay=document.createElement('span');overlay.className='play';overlay.textContent='▶';visual.append(overlay);const a=document.createElement('button');a.type='button';a.className='video-open';a.dataset.videoId=id;a.setAttribute('aria-label','Смотреть: '+desc);a.style.cssText='position:absolute;inset:0';visual.append(a);const info=document.createElement('div');info.className='work-info';const strong=document.createElement('strong');strong.textContent=title;const p=document.createElement('p');p.textContent=desc;const link=document.createElement('button');link.type='button';link.className='video-text';link.dataset.videoId=id;link.textContent='Смотреть на сайте ▶';info.append(strong,p,link);card.append(visual,info);list.append(card)});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});list.querySelectorAll('.work').forEach(w=>w.hidden=b.dataset.filter!=='all'&&w.dataset.category!==b.dataset.filter)}));
})();

document.addEventListener('DOMContentLoaded',()=>{
const modal=document.getElementById('misty-video-modal'), player=document.getElementById('misty-video-frame');
let opener;
const close=()=>{modal.hidden=true;player.pause();player.removeAttribute('src');player.load();document.body.style.overflow='';document.querySelector('header').inert=false;document.querySelector('main').inert=false;document.querySelector('footer').inert=false;opener?.focus()};
document.getElementById('work-list').addEventListener('click',e=>{
const button=e.target.closest('button[data-video-id]');if(!button)return;
opener=button;const card=button.closest('.work'),id=button.dataset.videoId;
player.src='videos/'+id+'.mp4';player.poster='videos/'+id+'.jpg';player.load();player.play().catch(()=>{});
player.title=card.querySelector('.work-info p').textContent;
document.querySelector('.misty-video-bar strong').textContent=player.title;
document.getElementById('misty-video-external').href='videos/'+id+'.mp4';
modal.hidden=false;document.body.style.overflow='hidden';document.querySelector('header').inert=true;document.querySelector('main').inert=true;document.querySelector('footer').inert=true;document.getElementById('misty-video-close').focus();
});
document.getElementById('misty-video-close').addEventListener('click',close);
modal.addEventListener('click',e=>{if(e.target===modal)close()});
document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){const items=[document.getElementById('misty-video-close'),player,document.getElementById('misty-video-external')];if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items[2].focus()}else if(!e.shiftKey&&document.activeElement===items[2]){e.preventDefault();items[0].focus()}}});
const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);document.querySelector('.navlinks').classList.toggle('is-open',open)});
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');document.querySelector('.navlinks').classList.remove('is-open')}));
});
