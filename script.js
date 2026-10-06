/* ===== CONFIGURE AQUI (sem banco de dados) ===== */
const WHATSAPP_DESTINO='5571999999999'; // DDI+DDD+número que vai receber
const EMAIL_DESTINO='denuncias@seudominio.com.br';
/* =============================================== */

const $=id=>document.getElementById(id);

// Estrutura do produto: [Nome, Categoria, Cor base, Preço, Preço promocional, URL da Imagem]
const P=[
  ['Vestido midi floral','vestido','#f06595','289,90','359,90','https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80'],
  ['Blusa de seda','blusa','#fff0f5','159,90','','https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80'],
  ['Calça alfaiataria','calca','#3b1226','219,90','279,90','https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80'],
  ['Saia plissada','saia','#b197fc','189,90','','https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80'],
  ['Vestido festa','vestido','#c2255c','459,90','','https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80'],
  ['Blusa ombro a ombro','blusa','#ffc9de','139,90','169,90','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'],
  ['Calça pantalona','calca','#e8c9a0','239,90','','https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'],
  ['Saia midi cetim','saia','#51cf66','199,90','249,90','https://images.unsplash.com/photo-1582142307425-f1c5048d0df5?auto=format&fit=crop&w=600&q=80'],
  ['Vestido tubinho','vestido','#1c1519','269,90','','https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80'],
  ['Blusa laço','blusa','#a5d8ff','149,90','','https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80'],
  ['Calça jeans reta','calca','#4c6ef5','229,90','','https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80'],
  ['Saia lápis','saia','#ffd43b','179,90','219,90','https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=80']
];

const BG=['#fde8ef','#fff0e6','#efe8fd','#e6f6ee','#e8f1fd'];
const IC={Todos:'✨',Vestidos:'👗',Blusas:'👚','Calças':'👖',Saias:'💃',Outlet:'🏷️'};
const CAT={vestido:'Vestidos',blusa:'Blusas',calca:'Calças',saia:'Saias'};
let filtro='Todos',q='',ord='',soFav=false,fav=new Set(),cart=[],tam='M',cupom=false;
const num=v=>parseFloat(v.replace(',','.')),brl=v=>'R$ '+v.toFixed(2).replace('.',',');

$('marq').innerHTML='NEW IN ✦ FRETE GRÁTIS ✦ PAGUE COM PIX ✦ TROCAS EM 30 DIAS ✦ '.repeat(8);

function toast(t){const e=$('toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1800)}

const foto=(p,i)=>`<img src="${p[5]}" alt="${p[0]}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" onerror="this.onerror=null;this.parentNode.innerHTML='<svg viewBox=\\'0 0 100 130\\'><use href=\\'#s-${p[1]}\\'+fill=\\'${p[2]}\\')/></svg>'">`;

function render(){
  $('chips').innerHTML=['Todos',...Object.values(CAT),'Outlet'].map(c=>`<button class="chip ${c===filtro?'on':''}" data-c="${c}">${IC[c]} ${c}</button>`).join('');
  let L=P.map((p,i)=>({p,i})).filter(({p,i})=>(filtro==='Todos'||(filtro==='Outlet'?p[4]:CAT[p[1]]===filtro))&&p[0].toLowerCase().includes(q)&&(!soFav||fav.has(i)));
  if(ord)L.sort((a,b)=>(num(a.p[3])-num(b.p[3]))*(ord==='a'?1:-1));
  $('grade').innerHTML=L.length?L.map(({p,i})=>`<article class="prod" data-i="${i}"><div class="foto" style="background:${BG[i%5]}"><span class="novo">${p[4]?'OUTLET':'NEW IN'}</span><button class="fav ${fav.has(i)?'on':''}" aria-label="Favoritar">♥</button>${foto(p,i)}</div><div class="info"><h3>${p[0]}</h3><div class="preco"><b>R$ ${p[3]}</b>${p[4]?`<s>R$ ${p[4]}</s>`:''}</div><button class="add">Ver detalhes</button></div></article>`).join(''):'<p class="vazio">Nenhuma peça encontrada.</p>';
  $('qfav').textContent=fav.size;
}
render();

function abrirMod(i){const p=P[i];tam='M';
  $('mod').innerHTML=`<div class="foto" style="background:${BG[i%5]};border-radius:24px 0 0 24px;min-height:320px">${foto(p,i)}</div><div style="padding:1.6rem"><button class="ic" id="xm" type="button" style="float:right" aria-label="Fechar">✕</button><span class="tag">${CAT[p[1]]}</span><h2 class="serif" style="margin:.7rem 0">${p[0]}</h2><div class="preco"><b>R$ ${p[3]}</b>${p[4]?`<s>R$ ${p[4]}</s>`:''}</div><p style="color:var(--mudo);font-size:.88rem;margin-bottom:1rem">Tecido leve, caimento perfeito e acabamento premium. Em até 3x sem juros ou 5% OFF no Pix.</p><b style="font-size:.8rem">Tamanho</b><div class="tam">${['P','M','G','GG'].map(t=>`<button type="button" data-t="${t}" class="${t==='M'?'on':''}">${t}</button>`).join('')}</div><button class="btn rosa" type="button" data-add="${i}" style="width:100%;justify-content:center">Adicionar à sacola</button></div>`;
  $('mod').classList.add('on');$('ov').classList.add('on')}

const fechaMod=()=>{$('mod').classList.remove('on');if(!$('gav').classList.contains('on'))$('ov').classList.remove('on')};
const abreGav=()=>{$('gav').classList.add('on');$('ov').classList.add('on')};
const fechaGav=()=>{$('gav').classList.remove('on');$('ov').classList.remove('on')};

function add(i,t){const k=i+t,x=cart.find(c=>c.k===k);x?x.q++:cart.push({k,i,t,q:1});drw()}

function drw(){
  const sub=cart.reduce((s,c)=>s+num(P[c.i][3])*c.q,0),desc=cupom?sub*.15:0,fr=(sub>=799||!sub)?0:24.9,tot=sub-desc+fr;
  $('qtd').textContent=cart.reduce((s,c)=>s+c.q,0);
  $('lista').innerHTML=cart.length?cart.map(c=>`<div class="it"><div class="mini" style="background:${BG[c.i%5]};overflow:hidden"><img src="${P[c.i][5]}" alt="${P[c.i][0]}" style="width:100%;height:100%;object-fit:cover;"></div><div style="flex:1"><b>${P[c.i][0]}</b><br>Tam ${c.t} · ${brl(num(P[c.i][3]))}</div><div class="q"><button data-m="${c.k}">−</button> ${c.q} <button data-p="${c.k}">+</button></div></div>`).join(''):'<p style="color:var(--mudo);padding:1rem 0">Sua sacola está vazia.</p>';
  $('bar').style.width=Math.min(100,sub/8)+'%';
  $('fr').textContent=sub>=799?'Você ganhou frete grátis! 🎉':'Faltam '+brl(799-sub)+' para o frete grátis';
  $('tot').innerHTML=`Subtotal ${brl(sub)}<br>${cupom?'Cupom −'+brl(desc)+'<br>':''}Frete ${fr?brl(fr):'grátis'}<br><b style="font-size:1.1rem">Total ${brl(tot)}</b>`;
}
drw();

document.addEventListener('click',e=>{
  const g=s=>e.target.closest(s);
  if(g('.chip')){filtro=g('.chip').dataset.c;render();return}
  if(g('.fav')){const i=+g('.prod').dataset.i;fav.has(i)?fav.delete(i):fav.add(i);render();return}
  if(g('.prod')&&!g('#mod')){abrirMod(+g('.prod').dataset.i);return}
  if(g('[data-t]')){tam=g('[data-t]').dataset.t;document.querySelectorAll('.tam button').forEach(b=>b.classList.toggle('on',b.dataset.t===tam))}
  if(g('[data-add]')){add(+g('[data-add]').dataset.add,tam);fechaMod();abreGav()}
  if(g('#xm'))fechaMod();
  if(g('[data-m]')){const c=cart.find(c=>c.k===g('[data-m]').dataset.m);if(--c.q<=0)cart=cart.filter(x=>x!==c);drw()}
  if(g('[data-p]')){cart.find(c=>c.k===g('[data-p]').dataset.p).q++;drw()}
});

$('bsac').onclick=abreGav;$('fechar').onclick=fechaGav;
$('ov').onclick=()=>{fechaGav();$('mod').classList.remove('on');$('ov').classList.remove('on')};
$('bfav').onclick=()=>{soFav=!soFav;$('bfav').style.borderColor=soFav?'var(--rosa)':'';render();location.hash='vitrine'};
$('busca').oninput=e=>{q=e.target.value.toLowerCase();render()};
$('ord').onchange=e=>{ord=e.target.value;render()};
$('apl').onclick=()=>{if($('cupom').value.trim().toUpperCase()==='PRIMEIRAFLOR'){cupom=true;toast('Cupom applied: 15% OFF');drw()}else toast('Cupom inválido')};
$('fin').onclick=()=>{if(!cart.length)return toast('Sua sacola está vazia');cart=[];cupom=false;drw();fechaGav();toast('Pedido recebido! Enviaremos a confirmação por e-mail.')};
document.querySelectorAll('.menu a').forEach((a,k)=>a.addEventListener('click',()=>{filtro=['Todos','Todos','Vestidos','Saias','Outlet'][k];soFav=false;render()}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){fechaGav();$('mod').classList.remove('on');$('ov').classList.remove('on')}});
$('nl').onclick=()=>toast('Obrigada! Você está na lista.');

/* painel oculto */
const painel=$('painel');
function abrir(){painel.classList.add('on');document.body.style.overflow='hidden';painel.scrollTop=0}
function sair(){painel.classList.remove('on');document.body.style.overflow='';$('form').reset();$('ok').style.display='none';$('fa').style.display='block';$('erro').textContent='';window.scrollTo(0,0)}
$('personal').onclick=abrir;$('atend').onclick=abrir;$('sair').onclick=sair;$('sair2').onclick=sair;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&painel.classList.contains('on'))sair()});
let cl=0,t;$('logo').onclick=()=>{cl++;clearTimeout(t);t=setTimeout(()=>cl=0,1500);if(cl>=5){cl=0;abrir()}};

function montar(){
  const v=id=>$(id).value.trim();
  if(!v('tipo')||v('relato').length<10){$('erro').textContent='Selecione o tipo de violência e escreva um breve relato.';return null}
  $('erro').textContent='';
  return `DENÚNCIA\nTipo: ${v('tipo')}\nQuando: ${v('data')||'não informado'}\nLocal: ${v('cidade')||'não informado'}\nAgressor: ${v('agressor')||'não informado'}\nVínculo: ${v('vinculo')||'não informado'}\nContato: ${v('contato')||'anônima'}\n\nRelato:\n${v('relato')}`;
}
function fim(){$('fa').style.display='none';$('ok').style.display='block';painel.scrollTop=0}
$('bzap').onclick=()=>{const m=montar();if(!m)return;window.open('https://wa.me/'+WHATSAPP_DESTINO+'?text='+encodeURIComponent(m),'_blank','noopener');fim()};
$('bmail').onclick=()=>{const m=montar();if(!m)return;location.href='mailto:'+EMAIL_DESTINO+'?subject='+encodeURIComponent('Pedido de atendimento')+'&body='+encodeURIComponent(m);fim()};