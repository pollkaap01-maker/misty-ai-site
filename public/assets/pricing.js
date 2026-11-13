(function(root){
const tables={"videoPrices": {"Сказочная 3D-анимация": {"До 30 секунд": 6000, "До 60 секунд": 9000, "До 90 секунд": 11000, "Более 90 секунд": 11000}, "Реализм": {"До 30 секунд": 8000, "До 60 секунд": 11000, "До 90 секунд": 13000, "Более 90 секунд": 13000}, "Предметная съёмка": {"До 30 секунд": 6000, "До 60 секунд": 8500, "До 90 секунд": 11000, "Более 90 секунд": 14000}, "Другой стиль": {"До 30 секунд": 8000, "До 60 секунд": 11000, "До 90 секунд": 13000, "Более 90 секунд": 13000}}, "packagePrices": {"Сказочная 3D-анимация": {"3 видео": 23000, "5 видео": 40000, "10 видео": 75000}, "Реализм": {"3 видео": 30000, "5 видео": 52000, "10 видео": 98000}, "Предметная съёмка": {"20 фото": 2000, "30 фото": 3000, "40 фото": 4000, "50 фото": 5000, "3 видео": 30000, "5 видео": 52000, "10 видео": 98000}, "Другой стиль": {"3 видео": 30000, "5 видео": 52000, "10 видео": 98000}}};
function price(s){
if(!s||!Object.hasOwn(tables.videoPrices,s.style))return null;
const photo=s.style==='Предметная съёмка'&&s.media==='Фото';
if(s.style==='Предметная съёмка'&&!s.media)return null;
if(photo)return ['20 фото','30 фото','40 фото','50 фото'].includes(s.qty)?tables.packagePrices[s.style][s.qty]:null;
if(!['1 видео','3 видео','5 видео','10 видео'].includes(s.qty)||!Object.hasOwn(tables.videoPrices[s.style],s.duration))return null;
if(s.qty==='1 видео')return tables.videoPrices[s.style][s.duration];
return Math.round((tables.packagePrices[s.style][s.qty]*tables.videoPrices[s.style][s.duration]/tables.videoPrices[s.style]['До 60 секунд'])/500)*500;
}
const api={...tables,price};root.MistyPricing=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
