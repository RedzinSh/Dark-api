const axios = require("axios");
const cheerio = require("cheerio");
const yts = require("yt-search")
const request = require('request');
const removerAcentos = (s) => typeof s === 'string' ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
const useragent_1 = {
  "user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"
};

function pensador(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://www.pensador.com/busca.php?q=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.thought-card.mb-20").each((_, say) => {
    var frase = $(say).find("p").text().trim(); 
    var compartilhamentos = $(say).find("div.total-shares").text().trim(); 
    var autor = $(say).find("a").text().split("\n")[0];
    var imagem = $(say).find("div.sg-social-hidden.sg-social").attr('data-media');
    var resultado = {
      autor: autor,
      compartilhamentos: compartilhamentos,      
      imagem: imagem,
      frase: frase
    }
    postagem.push(resultado)
  })
//  console.log(tod.data)
  resolve(postagem)
  }).catch(reject)
  });
}

async function geturl(nome) {
  return new Promise((resolve, reject) => {
const search = yts(nome)
            .then(async(data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
}
}
var resultado = { 
link: url[0] 
}               
return(resultado) 
}) 
resolve(search)
})
}

 function gppq(pagina) {
return new Promise((resolve, reject) => {
 axios.get(`https://grupowhatsap.com/page/${pagina}/?amp=1`).then(tod => {
const $ = cheerio.load(tod.data)
var postagem = [];
$("div.grupo").each((_, say) => {
 var _ikk = $(say).find("a").attr('href');
 var _ikkli = $(say).find("img").attr('src');
 var _ikkkkk = {
img: _ikkli,
linkk: _ikk
 }
 postagem.push(_ikkkkk)
})
resolve(postagem)
 }).catch(reject)
});
 }
 
 
 const rastrear = async (id) => {
const res = await axios.get('https://www.linkcorreios.com.br/?id=' + id)
const $ = cheerio.load(res.data)
const breners = []
let info = $('ul.linha_status.m-0').find('li').text().trim();
let infopro = $('ul.linha_status').find('li').text().trim();
breners.push({ info, infopro })
return breners
}
 


const getgrupos = async () => {
let numberskk = ['1',
 '2',
 '3',
 '4',
 '5',
 '6',
 '7',
 '8',
 '9',
 '10',
 '11'] //acrecente mais!maximo e 60!
paginas = numberskk[Math.floor(Math.random() * numberskk.length)]
let ilinkkk = await gppq(paginas)
let linkedgpr = ilinkkk[Math.floor(Math.random() * ilinkkk.length)]
const res = await axios.get(linkedgpr.linkk)
const $ = cheerio.load(res.data)
var postagem = []
var img = $('div.post-thumb').find("amp-img").attr('src')
var nome = $('div.col-md-9').find('h1.pagina-titulo').text().trim()
var desc = $('div.col-md-9').find('p').text().trim()
var link = $('div.post-botao').find('a').attr('href')
postagem.push({ img, nome, desc, link })
return postagem
}



function pinterest(querry){
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift();
		resolve(hasil)
		})
	})
}


function styletext(texto) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+texto)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
                hasil.push({ nome: $(b).find('td:nth-child(1) > span').text(), fonte: $(b).find('td:nth-child(2)').text().trim() })
            })
            resolve(hasil)
        })
    })
}

//wallpaper.mob.org
function wallmob() {
return new Promise((resolve, reject) => {
  axios.get(`https://wallpaper.mob.org/gallery/tag=anime/`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.image-gallery-image ").each((_, say) => {
   var img = $(say).find("img").attr('src');
    var resultado = {
    img: img
    }
    postagem.push(resultado)
  })
//  console.log(tod.data)
  resolve(postagem)
  }).catch(reject)
  });
}

//Assistirhentai Pesquisa
function assistitht(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://www.assistirhentai.com/?s=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.videos").each((_, say) => {
    var nome = $(say).find("h2").text().trim(); 
    var img = $(say).find("img").attr('src');
    var link = $(say).find("a").attr('href');
    var data_up = $(say).find("span.video-data").text().trim(); 
    var tipo = $(say).find("span.selo-tipo").text().trim();     
    var eps = $(say).find("span.selo-tempo").text().trim();         
    var resultado = {
      nome: nome,
      img: img,
      link: link,
      data_up: data_up,
      tipo: tipo,
      total_ep: eps
    }
    postagem.push(resultado)
  })
//  console.log(tod.data)
  resolve(postagem)
  }).catch(reject)
  });
}

//Assistirhentai dl
function assistithtdl(link) {
return new Promise((resolve, reject) => {
  axios.get(`${link}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.meio").each((_, say) => {
    var nome = $(say).find("h1.post-titulo").text().trim(); 
    var img = $(say).find("img").attr('src');
    var descrição = $(say).find("p").text().trim(); 
    var link = $(say).find("source").attr('src');
    var resultado = {
      nome: nome,
      capa: img,
      descrição: descrição,
      link_dl: link
    }
    postagem.push(resultado)
  })
//  console.log(tod.data)
  resolve(postagem)
  }).catch(reject)
  });
}

//Porno gratis
function pornogratis(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://pornogratis.vlog.br/?s=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.videos-row").each((_, say) => {
    var nome = $(say).find("a").attr('title');
    var img = $(say).find("img").attr('src');
    var link = $(say).find("a").attr('href');
    var resultado = {
      nome: nome,
      img: img,
      link: link
    }
    postagem.push(resultado)
  })
//  console.log(tod.data)
  resolve(postagem)
  }).catch(reject)
  });
}

function htdl(link) {
return new Promise((resolve, reject) => {
  axios.get(`${link}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.toggle").each((_, say) => {
    var link = $(say).find("video").attr('src');
    var resultado = {
      link: link
    }
    postagem.push(resultado)
  })
//  console.log(tod.data)
  resolve(postagem)
  }).catch(reject)
  });
}

function papeldeparede(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://wall.alphacoders.com/search.php?search=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.boxgrid").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link1 = $(say).find("a").attr('href');
    var link = `https://wall.alphacoders.com${link1}`
    var img = $(say).find("img").attr('src');    
    var resultado = {
      titulo: titulo,
      img: img,
      link: link
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

function xnxxdl(link_video) { return new Promise((resolve, reject) => {
fetch(link_video, {method: 'get'}).then(sexokk => sexokk.text()).then(sexokk => {var sayo = cheerio.load(sexokk, {xmlMode: false});resolve({
criador: "breno/sayo",
resultado: {título: sayo('meta[property="og:title"]').attr('content'),duração: sayo('meta[property="og:duration"]').attr('content'),img: sayo('meta[property="og:image"]').attr('content'),tipo_vd: sayo('meta[property="og:video:type"]').attr('content'),vd_altura: sayo('meta[property="og:video:width"]').attr('content'),vd_largura: sayo('meta[property="og:video:height"]').attr('content'),informações: sayo('span.metadata').text(),resultado2: {qualidade_baixa: (sayo('#video-player-bg > script:nth-child(6)').html().match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],qualidade_alta: sayo('#video-player-bg > script:nth-child(6)').html().match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],qualidade_HLS: sayo('#video-player-bg > script:nth-child(6)').html().match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],capa: sayo('#video-player-bg > script:nth-child(6)').html().match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],capa69: sayo('#video-player-bg > script:nth-child(6)').html().match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],capa_slide: sayo('#video-player-bg > script:nth-child(6)').html().match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],capa_slide_grande: sayo('#video-player-bg > script:nth-child(6)').html().match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]}}})}).catch(err => reject({code: 503, status: false, result: err }))})}

//WIKIPEDIA
var wiki = async (query) => {
var res = await axios.get(`https://pt.m.wikipedia.org/wiki/${query}`)
var $ = cheerio.load(res.data)
var postagem = []
var titulo = $('#mf-section-0').find('p').text()
var capa = $('#mf-section-0').find('div > div > a > img').attr('src')
capaofc = capa ? capa : '//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'
img = 'https:' + capaofc
var título = $('h1#section_0').text()
postagem.push({ titulo, img })
return postagem
}

//FF
function ff(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://www.ffesportsbr.com.br/?s=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("article.home-post.col-xs-12.col-sm-12.col-md-4.col-lg-4.py-3").each((_, say) => {
    var titulo = $(say).find("h2").text().trim();
    var keywords = $(say).find("ul").text().trim();
    var publicado = $(say).find("span").text().trim();
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('src');
    var resultado = {
      titulo: titulo,
      keywords: keywords,
      publicado: publicado,
      img: img,
      link: link
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

//INSTAGRAM STALK
function igstalk(nome) {
	return new Promise(async (resolve, reject) => {
		let {
			data
		} = await axios('https://www.instagram.com/' + nome + '/?__a=1', {
			'method': 'GET',
			'headers': {
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
				'cookie': 'isi sendiri cokie igeh'
			}
		})
		let user = data.graphql.user
		let json = {
			criador: '"_breno.exe_',
			status: 'online',
			code: 200,
			nome: user.username,
			nome_todo: user.full_name,
			verificado: user.is_verified,
			videos: user.highlight_reel_count,
			seguidores: user.edge_followed_by.count,
			seguindo: user.edge_follow.count,
			conta_business: user.is_business_account,
			conta_profissional: user.is_professional_account,
			categoria: user.category_name,
			capa: user.profile_pic_url_hd,
			bio: user.biography,
			info_conta: data.seo_category_infos
		}
		resolve(json)
	})
}

//DAFONTE
const dafontSearch = async (query) => {
const base = `https://www.dafont.com`
const res = await axios.get(`${base}/search.php?q=${query}`)
const $ = cheerio.load(res.data)
const hasil = []
const total = $('div.dffont2').text().replace(` fonts on DaFont for ${query}`, '') 
$('div').find('div.container > div > div.preview').each(function(a, b) {
$('div').find('div.container > div > div.lv1left.dfbg').each(function(c, d) { 
$('div').find('div.container > div > div.lv1right.dfbg').each(function(e, f) { 
let link = `${base}/` + $(b).find('a').attr('href')
let titulo = $(d).text() 
let estilo = $(f).text() 
hasil.push({ titulo, estilo, total, link }) 
}) 
}) 
}) 
return hasil
}

const dafontDown = async (link) => {
const des = await axios.get(link)
const sup = cheerio.load(des.data)
const result = []
let estilo = sup('div').find('div.container > div > div.lv1right.dfbg').text() 
let titulo = sup('div').find('div.container > div > div.lv1left.dfbg').text() 
try {
isi = sup('div').find('div.container > div > span').text().split('.ttf')
saida = sup('div').find('div.container > div > span').eq(0).text().replace('ttf' , 'zip')
} catch {
isi = sup('div').find('div.container > div > span').text().split('.otf')
saida = sup('div').find('div.container > div > span').eq(0).text().replace('otf' , 'zip')
}
let download = 'http:' + sup('div').find('div.container > div > div.dlbox > a').attr('href')
result.push({ estilo, titulo, isi, saida, download})
return result
}

//GRUPO
function gpsrc(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://zaplinksbrasil.com.br/?s=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.grupo").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('src');
    var conteudo = $(say).find("div.listaCategoria").text().trim();
    var resultado = {
      titulo: titulo,
      img: img,
      conteudo: conteudo,
      link: link
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

//STICKER SEARCH
function st(nome) { return new
 Promise((resolve, reject) => {
		axios.get(`https://getstickerpack.com/stickers?query=${query}`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				$('#stickerPacks > div > div:nth-child(3) > div > a')
				.each(function(a, b) {
					link.push($(b).attr('href'))
				})
				rand = link[Math.floor(Math.random() * link.length)]
				axios.get(rand)
					.then(({
						data
					}) => {
						const $$ = cheerio.load(data)
						const url = [];
						$$('#stickerPack > div > div.row > div > img')
						.each(function(a, b) {
							url.push($$(b).attr('src').split('&d=')[0])})
				 		resolve({
							criador: '@breno',
							titulo: $$('#intro > div > div > h1').text(),
							autor: $$('#intro > div > div > h5 > a').text(),
							autor_link: $$('#intro > div > div > h5 > a').attr('href'),
							figurinhas: url
		 				})})})})}


//PORNHUB
function pornhub(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://pt.pornhub.com/video/search?search=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("li.pcVideoListItem.js-pop.videoblock.videoBox").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('data-thumb_url');
    var duração = $(say).find("var.duration").text().trim();
    var qualidade = $(say).find("span.hd-thumbnail").text().trim();
    var autor = $(say).find("div.usernameWrap").text().trim();    
    var visualizações = $(say).find("span.views").text().trim();    
    var data_upload = $(say).find("var.added").text().trim();        
    var hype = $(say).find("div.value").text().trim();    
    var link2 = `https://pt.pornhub.com${link}`
    var resultado = {
      titulo: titulo,
      img: img,
      duração: duração,
      qualidade: qualidade,
      autor: autor,
      visualizações: visualizações,
      data_upload: data_upload,
      hype: hype,
      link: link2
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

//XVIDEOS
function xvideos1(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://xvideosporno.blog.br/?s=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.postbox").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('src');
    var duração = $(say).find("time.duration-top").text().trim();
    var qualidade = $(say).find("b.hd-top").text().trim();
    var resultado = {
      titulo: titulo,
      img: img,
      duração: duração,
      qualidade: qualidade,
      link: link
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

const xvideos= (q) => new Promise((resolve, reject) => {
  axios.get(`https://www.xvideos.com/?k=${removerAcentos(q).replaceAll(' ', '+')}`, {
      headers: {
        ...useragent_1
      }
    })
    .then((res) => {
      const $ = cheerio.load(res.data);
      const dados = [];
      $('div[class="thumb-block  "]').each((i, e) => {
        dados.push({
          titulo: $(e).find('.thumb-under > p > a').attr('title'),
          duracao: $(e).find('.thumb-under > p > a > span').text(),
          imagem: $(e).find('img').attr('data-src'),
          link: 'https://www.xvideos.com' + $(e).find('.thumb-under > p > a').attr('href')
        });
      });
      resolve({
        status: res.status,
        criador: 'Redzin',
        resultado: dados
      });
    })
    .catch((e) => {
      reject(e)
    });
});

//UPTODOWN
function uptodown(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://br.uptodown.com/android/search/${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.item").each((_, say) => {
    var titulo = $(say).find("div.name").text().trim();
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img.app_card_img.lazyload").attr('data-src');
    var descrição = $(say).find("div.description").text().trim();
    var resultado = {
      titulo: titulo,
      link: link,
      icone: img,
      descrição: descrição
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

//GRUPOS WHATSAPP
function gpwhatsapp() {
return new Promise((resolve, reject) => {
  axios.get(`https://gruposwhats.app/`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.col-12.col-md-6.col-lg-4.mb-4.col-group").each((_, say) => {
    var nome = $(say).find("h5.card-title").text().trim();
    var descrição = $(say).find("p.card-text").text().trim();
    var link = $(say).find("a.btn.btn-success.btn-block.stretched-link.font-weight-bold").attr('href');
    var img = $(say).find("img.card-img-top.lazy").attr('data-src');
    var resultado = {
      nome: nome,
      link: link,
      descrição: descrição,
      img: img
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}


//HENTAIS TUBE
function hentaistube(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://www.hentaistube.com/buscar/?s=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.epiItem").each((_, say) => {
    var titulo = $(say).find("div.epiItemNome").text().trim();
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('src');
    var resultado = {
      titulo: titulo,
      link: link,
      img: img
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}


//NERDING
function nerding(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://www.nerding.com.br/search?q=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.col-sm-6.col-xs-12.item-boxed-cnt").each((_, say) => {
    var titulo = $(say).find("h3.title").text().trim();
    var descrição = $(say).find("p.summary").text().trim();
    var imagem = $(say).find("img.lazyload.img-responsive").attr('src');
    var link = $(say).find("a.pull-right.read-more").attr('href');
    var review = $(say).find("span.label-post-category").text().trim();
//    var autor = $(say).find("p.post-meta-inner").text().trim();
    var resultado = {
      titulo: titulo,
      descrição: descrição,
      imagem: imagem,
      review: review,      
      link: link
//      autor: autor
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

//SOUND CLOUD DOWNLOAD
function soundl(link) {
return new Promise((resolve, reject) => {
		const opções = {
			method: 'POST',
			url: "https://www.klickaud.co/download.php",
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			formData: {
				'value': link,
				'2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37': '710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3'
			}
		};
		request(opções, async function(error, response, body) {
			console.log(body)
			if (error) throw new Error(error);
			const $ = cheerio.load(body)
			resolve({
				titulo: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text(),
				total_downloads: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)').text(),
				capa: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
				link_dl: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0]
			});
		});
	})
}

//APKMODHACKER
function apkmodhacker(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://apkmodhacker.com/?s=${nome}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.post-inner.post-hover").each((_, say) => {
    var nome = $(say).find("h2.post-title.entry-title").text().trim();
    var descrição = $(say).find("div.entry.excerpt.entry-summary").text().trim();
    var imagem = $(say).find("img.attachment-thumb-medium.size-thumb-medium.wp-post-image").attr('src');
    var link = $(say).find("a").attr('href');
    var categoria = $(say).find("p.post-category").text().trim();
    var horario_upload = $(say).find("time.published.updated").attr('datetime');   
    var resultado = {
      nome: nome,
      descrição: descrição,
      categoria: categoria,
      imagem: imagem,
      link: link,
      horario_upload: horario_upload
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

module.exports = { geturl, pensador, styletext, getgrupos, gpwhatsapp, hentaistube, nerding, apkmodhacker, uptodown, pornhub, st, gpsrc, dafontSearch, dafontDown, igstalk, ff, papeldeparede, htdl, assistithtdl, assistitht, pornogratis, wallmob, pinterest, rastrear,xvideos, xvideos1, soundl}

//xvideos('porno').then((data) => console.log(data))