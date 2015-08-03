/**USAGE: 
 *  pt-br: glossary.UI.start['pt_BR'] ou glossary.UI.start[language]
 *  var language possui o idioma usado pelo device e selecionado pelo usuário
 */ 
var glossary = {
  UI: {
		start: { //glossary.UI.start[language]
      pt_BR: '[INICIAR]',
      en_US: '[START GAME]'
    },
		tutorial: { //glossary.UI.tutorial[language]
      pt_BR: '[COMO JOGAR]',
      en_US: '[TUTORIAL]'
    },
		settings: { //glossary.UI.settings[language]
      pt_BR: '[OPÇÕES]',
      en_US: '[SETTINGS]'
    },
		credits: { //glossary.UI.credits[language]
      pt_BR: '[CRÉDITOS]',
      en_US: '[CREDITS]'
    },
    optionsTxt :{ //glossary.UI.optionsTxt[language]
      pt_BR: '  *MENU DE OPÇÕES*__SOM & BGM_____REGIÃO/REGION_____RESETAR DADOS SALVOS',
      en_US: '  *SETTINGS MENU*__SFX & BGM_____REGIÃO/REGION_____RESET SAVE DATA'
    },
    firstRunSetupTxt :{ //glossary.UI.firstRunSetupTxt['all']
      all: '  *INITIAL SETUP*__SOM/SOUND?_____IDIOMA/LANGUAGE_____',
    },
    sim :{ //glossary.UI.sim[language]
      pt_BR: '[SIM]',
      en_US: '[YES]'
    },
    nao :{ //glossary.UI.nao[language]
      pt_BR: '[NÃO]',
      en_US: '[NO]'
    },
    salvar :{ //glossary.UI.salvar[language]
      pt_BR: '[SALVAR]',
      en_US: '[ SAVE ]'
    },
    voltar :{ //glossary.UI.voltar[language]
      pt_BR: '[VOLTAR]',
      en_US: '[ BACK ]'
    },
    proximo :{ //glossary.UI.proximo[language]
      pt_BR: '[PRÓXIMO]',
      en_US: '[ NEXT ]'
    },
    fim :{ //glossary.UI.fim[language]
      pt_BR: '[  FIM  ]',
      en_US: '[  END  ]'
    },
    continuar :{ //glossary.UI.continuar[language]
      pt_BR: '[RETOMAR]',
      en_US: '[RESUME]'
    },
    sair :{ //glossary.UI.sair[language]
      pt_BR: '[SAIR]',
      en_US: '[QUIT]'
    }
	},
  text: {
    tutorialTitle: { //glossary.text.tutorialTitle[language]
      pt_BR: '   *COMO JOGAR*',
      en_US: '   *HOW TO PLAY*'
    },
    tutorialSkip: { //glossary.text.tutorialSkip[language]
      pt_BR: 'TOQUE PARA PULAR',
      en_US: '  TAP TO SKIP'
    },
    storyPg1: { //glossary.text.storyPg1[language]
      pt_BR: '      *HISTÓRIA*____'
            +'Havia um lendário__xerife conhecido como__Billy West.__Billy e sua esposa__adotaram dois garotos__órfãos de guerra,__'
            +'o lobo Rolf e__o morcego Agile.____Ambos foram ensinados__no caminho da justiça,__mas apenas Rolf seguiu__os passos de Billy,__'
            +'enquanto Agile queria__apenas poder e fama.____20 anos se passaram__e agora Agile cria__a WildBat Gang, temido__grupo de morcegos__'            
            +'fora-da-lei, e com__eles Agile invade sua__terra natal.____Melody pede ajuda__ao jovem Rolf que__agora se prepara__para proteger a cidade__'
            +'das garras de Agile.___',
      en_US: '       *STORY*____'
            +'There was a legendary__Sheriff known as__Billy West.__Billy and his wife__adopted two war__orphaned kids,__'
            +'Rolf the wolf__and Agile the bat.____Both were raised__in the path of justice,__but only Rolf followed__Billy\'s steps,__'
            +'while Agile only__wanted power and fame.____20 years have passed__and now Agile creates__the WildBat Gang,__a feared group of__'            
            +'outlaw bats, and__with them Agile__invades his hometown.____Melody asks Rolf for__help and now he is__getting ready to__protect the city__'
            +'from Agile\'s clutches.___'
    },
    storyPg2: { //glossary.text.storyPg2[language]
      pt_BR: '     *PERSONAGENS*____'
            +'Rolf West:__Sucessor de Billy West__e herói deste jogo.__Um pouco desastrado__mas com boa pontaria__e senso de justiça.__',
      en_US: '     *CHARACTERS*____'
            +'Rolf West:__Billy West\'s successor__and hero of this game.__A bit goofy but with__nice shooting skills__and sense of justice.__'
    },
    storyPg3: { //glossary.text.storyPg2[language]
      pt_BR: '     *PERSONAGENS*____'
            +'Melody Smith:__Filha do prefeito__e a paixão de Rolf.__É uma jovem meiga__mas muito corajosa.__Está secretamente__apaixonada por Rolf.__',
      en_US: '     *CHARACTERS*____'
            +'Melody Smith:__Mayor\'s daughter and__Rolf\'s love interest.__A young but very__brave girl. She\'s__secretly in love__with Rolf.__'
    },
    storyPg4: { //glossary.text.storyPg2[language]
      pt_BR: '     *PERSONAGENS*____'
            +'Agile West:__Irmão adotivo de Rolf__e lider da WildBat__Gang. É o melhor__aluno de Billy, mas__preferiu uma vida__de crimes e violência.__',
      en_US: '     *CHARACTERS*____'
            +'Agile West:__Rolf\'s adoptive__brother and WildBat__Gang leader. Billy\'s__best apprentice, but__has chosen a path__of crimes and violence.__'
    },
    storyPg5: { //glossary.text.storyPg2[language]
      pt_BR: '     *PERSONAGENS*____'
            +'Habitantes da cidade:__________________'
            +'WildBat Gang:______',
      en_US: '     *CHARACTERS*____'
            +'Townspeople:__________________'
            +'WildBat Gang:______',
    },
    municao: { //glossary.text.peixe[language]
      pt_BR: 'BALAS',
      en_US: 'AMMO',
    },
    alertaReload: { //glossary.text.alertaReload[language]
      pt_BR: '  RECARREGUE!!!',
      en_US: '     RELOAD!!!'
    },
    finalstageMsg: { //glossary.text.finalstageMsg[language]
      pt_BR: 'Estou com a Melody!____Se quiser ela de volta__venha sozinho e me__encontre na antiga__delegacia...____Agile West',
      en_US: "I have Melody!____If you want her back__come alone and find__me at the old sheriff__station...____Agile West"
    },
    wingame0: { //glossary.text.wingame0[language]  NORMAL
      pt_BR: "A batalha acabou!____Rolf derrota a WildBat__Gang e restaura a paz__da cidade!____Parabéns!!!__Até o próximo jogo!",
      en_US: "The battle is over!____Rolf defeated WildBat__Gang and restored peace__to the town!____Congratulations!!!__See you next game!"
    },
    wingame1: { //glossary.text.wingame1[language]  HARD
      pt_BR: "A batalha acabou!____Uma nova lenda__nasce no velho oeste!__As histórias de Rolf__serão contadas por__gerações!____Parabéns!!!__Até o próximo jogo!",
      en_US: "The battle is over!____A new legend is__born at old west!__Rolf\'s tales will be__told for generations!____Congratulations!!!__See you next game!"
    },
    wingame2: { //glossary.text.wingame2[language]
      pt_BR: "JOGUE O MODO HARD!!____SELECIONE [STAGE 25]_NA TELA TÍTULO!",
      en_US: "LET'S TRY HARD MODE!____SELECT [STAGE 25]_ON THE TITLE SCREEN!"
    },
    wingame3: { //glossary.text.wingame2[language]
      pt_BR: "OBRIGADO POR JOGAR!____  VOCÊ É UM_  SUPER JOGADOR!!",
      en_US: "THANKS FOR PLAYING!____  YOU ARE A_  SUPER PLAYER!!!"
    },
    gameover: { //glossary.text.gameover[language]
      pt_BR: "    FIM DE JOGO!",
      en_US: "     GAME OVER!"
    }
	},
	// ...
};