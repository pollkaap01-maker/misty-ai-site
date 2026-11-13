const assert=require('node:assert/strict'),p=require('../public/assets/pricing.js');
const durations=['До 30 секунд','До 60 секунд','До 90 секунд','Более 90 секунд'],qty=['1 видео','3 видео','5 видео','10 видео'];
const expected={
'Сказочная 3D-анимация':[[6000,9000,11000,11000],[15500,23000,28000,28000],[26500,40000,49000,49000],[50000,75000,91500,91500]],
'Реализм':[[8000,11000,13000,13000],[22000,30000,35500,35500],[38000,52000,61500,61500],[71500,98000,116000,116000]],
'Предметная съёмка':[[6000,8500,11000,14000],[21000,30000,39000,49500],[36500,52000,67500,85500],[69000,98000,127000,161500]],
'Другой стиль':[[8000,11000,13000,13000],[22000,30000,35500,35500],[38000,52000,61500,61500],[71500,98000,116000,116000]]};
let count=0;for(const[style,table]of Object.entries(expected))qty.forEach((q,qi)=>durations.forEach((duration,di)=>{const state={style,media:'Видео',qty:q,duration};assert.equal(p.price(state),table[qi][di],JSON.stringify(state));count++}));
[20,30,40,50].forEach(n=>{assert.equal(p.price({style:'Предметная съёмка',media:'Фото',qty:n+' фото'}),n*100);count++});
assert.equal(p.price({style:'Предметная съёмка',media:null}),null);assert.equal(p.price({style:'No style'}),null);assert.equal(p.price({style:'Реализм',qty:'50 фото'}),null);
console.log('PASS',count,'fixed expected combinations, all brief examples, distinct product 90+ pricing, photo packages and invalid state guards');
