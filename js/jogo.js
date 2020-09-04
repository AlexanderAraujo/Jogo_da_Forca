var palavras = ["superman", "batman", "Lanterna Verde", "Homem de Ferro", "margarida", "orquidea", "girassol", "azalea", 
				"basquete", "beisebol", "futebol", "polo aquatico", "cavalo", "onça pintada", "girafa", "macaco", "panela",
				"microondas", "escorredor de pratos", "geladeira", "ferrari", "chevrolet", "mitsubishi", "toyota", "Sao Paulo",
				"Belo Horizonte", "Sao Sebastiao do Paraiso", "Carmo do Paranaiba"];
var indice = [];
var y = 0;
var nErros = 0
var contadorLetras = 0;
var letrasUtilizadas = [];
var palavraAtual = '';
var fumacaIMG = '<img src="imagens/fumaca.gif"/>';
var perdeuImg = '<img src="imagens/perdeu.png"/>';
var ganhouImg = '<img src="imagens/ganhou.png"/>';
var totalCaracteres = 0;
var arrayPalavra = [];
var palavraSeparada = [];
var palavraDigitada = '';
var somFumaca = new Audio();

somFumaca.src = 'audios/smoke.mp3';

function comecarJogo() {
	var dica;
	var aleatorio = Math.floor(Math.random() * 27);

	palavraAtual = palavras[aleatorio].toUpperCase();	

	palavraSeparada.push(palavraAtual.split(""));

	//seleciona o tema de acordo com o numero aleatorio e sua palavra
	if (aleatorio >= 0 && aleatorio <= 3) {
		dica = 'Super Herói';
	}
	if (aleatorio > 3 && aleatorio <= 7) {
		dica = 'Flor';
	}
	if (aleatorio > 7 && aleatorio <= 11) {
		dica = 'Esporte';
	}
	if (aleatorio > 11 && aleatorio <= 15) {
		dica = 'Animal';
	}
	if (aleatorio > 15 && aleatorio <= 19) {
		dica = 'Cozinha';
	}
	if (aleatorio > 19 && aleatorio <= 23) {
		dica = 'Marca de Carro';
	}
	if (aleatorio > 23 && aleatorio <= 27) {
		dica = 'Cidades';
	}

	//insere o valor no campo dica
	document.getElementById('campoDica').innerHTML = dica;

	var nEspacos = 0;	

	//cria o numero de campos de acordo com o total de letras da palavra
	for (var x = 0; x < palavraAtual.length; x++) {		
		if (palavraAtual[x] === ' ') {
			document.getElementById('palavras').innerHTML += '<div class="letraEspaco" id="letraAtual' + x + '"></div>';
			nEspacos++;
		} else {
			document.getElementById('palavras').innerHTML += '<div class="letra" id="letraAtual' + x + '"></div>';
		}			
	}

	totalCaracteres = (palavraAtual.length - nEspacos);

	//insere o numero de letras da palavra no painel
	document.getElementById('totalLetras').innerHTML = totalCaracteres;		
}

function fimDeJogo(imagem) {	
	document.getElementById('botaoContinuar').innerHTML = '<button type="button"'
		+ 'class="btn btn-info btn-lg botaoContinue" onclick="location.reload()">Jogar Novamente</button>';	    
    document.getElementById('mensagemFinal').innerHTML = imagem;
    document.getElementById('painel').className = 'd-none';
}

function tentaPalavra() {	
	var tentaPalavra = document.getElementById('tentarPalavra').value;

	if (tentaPalavra != '') {	
		if (tentaPalavra === palavraAtual) {
			for (var z = 0; z < tentaPalavra.length; z++) {
				//limpa o campo resultado antes de inserir a palavra correta
				document.getElementById('letraAtual' + z).innerHTML = '';
				//insere a palavra correta no campo resultado
				document.getElementById('letraAtual' + z).innerHTML += tentaPalavra[z].toUpperCase();
			}

			fimDeJogo(ganhouImg);
		} else {	
			document.getElementById('imgBoneco').innerHTML = '<img src="imagens/fumaca1.gif"/>';
			somFumaca.play(); 
			document.getElementById('imgBoneco').className += ' bonecoIMG6';		
			fimDeJogo(perdeuImg);
			document.getElementById('respostaCorreta').className = 'respostaCorreta'
			document.getElementById('respostaCorreta').innerHTML = 'Resposta Correta: ' + palavraAtual				
		}
	}				
}

function buscaLetra() {
	var letraDigitada = document.getElementById('digitaLetra').value;
	
	if (letraDigitada != '' ) {		
		//pega o valor do indice da letra digitada referente a palavra
		var letra = palavraAtual.indexOf(letraDigitada);
		//limpa o campo digite uma letra
		document.getElementById('digitaLetra').value = '';		

		//verifica se a letra digitada ja foi digitada antes
		if (letrasUtilizadas.indexOf(letraDigitada) != -1) {
			alert('Você já utilizou essa letra, escolha outra');		
		} else {
			//captura as palavras que foram utilizadas e armazena
			letrasUtilizadas.push(letraDigitada);

			//insere as letras digitadas no painel
			document.getElementById('letrasUsadas').innerHTML += letraDigitada + ' - ';

			//verifique se a palavra possui o indice referente
			while (letra != -1) {
				//armazena os indices dentro do array indice
				indice.push(letra);
				letra = palavraAtual.indexOf(letraDigitada, letra + 1);																				
			}

			//insere a palavra digita caso ela conste na palavra dentro do seu campo		
			while (y < indice.length) {					
				document.getElementById('letraAtual' + indice[y]).innerHTML += letraDigitada;
				contadorLetras++;
				y++;	
				arrayPalavra.push(letraDigitada);
			}				
			
			//verifica se a palavra digitada não consta dentro da palavra
			if (palavraAtual.indexOf(letraDigitada) === -1) {
				//acrescenta 1 à variavel a cada erro					
				nErros++;					
				document.getElementById('imgBoneco').innerHTML = '<img src="imagens/fumaca' + nErros + '.gif"/>';
				somFumaca.play();
				document.getElementById('imgBoneco').className = 'boneco bonecoIMG' + nErros;					
			}
		}				

		if (nErros === 6) {
			fimDeJogo(perdeuImg);
			document.getElementById('respostaCorreta').className = 'respostaCorreta'
			document.getElementById('respostaCorreta').innerHTML = 'Resposta Correta: ' + palavraAtual	
			tentaPalavra().remove;			
		}
		
		palavraDigitada = arrayPalavra.slice(0, arrayPalavra.length);

		for (let i = 0; i<indice.length; i++) {
			palavraDigitada[indice[i]] = arrayPalavra[i];
		}

		palavraDigitada = palavraDigitada.join("");

		if (contadorLetras === totalCaracteres || palavraDigitada === palavraAtual) {				
			fimDeJogo(ganhouImg);
		}	
	}

	//elemento de focus no input digita letra
	document.getElementById('digitaLetra').focus();
}