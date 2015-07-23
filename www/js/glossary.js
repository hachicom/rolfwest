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
      pt_BR: '  *MENU DE OPÇÕES*__SOM & BGM_____REGIÃO/REGION_____RESETAR HISCORE',
      en_US: '  *SETTINGS MENU*__SFX & BGM_____REGIÃO/REGION_____RESET HISCORE'
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
            +'fora-da-lei, e com__eles Agile invade sua__terra natal.____Atrapalhado e valente,__o jovem Rolf parte__para proteger a cidade__'
            +'das garras de Agile.___',
      en_US: '       *STORY*____'
            +'There was a legendary__Sheriff known as__Billy West.__Billy and his wife__adopted two war__orphaned kids,__'
            +'Rolf the wolf__and Agile the bat.____Both were raised__in the path of justice,__but only Rolf followed__Billy\'s steps,__'
            +'while Agile only__wanted power and fame.____20 years have passed__and now Agile creates__the WildBat Gang,__a feared group of__'            
            +'outlaw bats, and__with them Agile__invades his hometown.____Goofy but also brave,__the young Rolf goes__to protect his city__'
            +'from Agile\'s clutches.___'
    },
    storyPg2: { //glossary.text.storyPg2[language]
      pt_BR: '     *PERSONAGENS*____'
            +'Rolf West:__Sucessor de Billy West__e herói deste jogo.____',
      en_US: '     *CHARACTERS*____'
            +'Rolf West:__Billy West\'s successor__and hero of this game.____'
    },
    storyPg3: { //glossary.text.storyPg2[language]
      pt_BR: '     *PERSONAGENS*____'
            +'Melody Smith:__Filha do prefeito,__e namorada de Rolf.____',
      en_US: '     *CHARACTERS*____'
            +'Melody Smith:__Mayor\'s daughter,__and Rolf\'s girlfriend.____'
    },
    storyPg4: { //glossary.text.storyPg2[language]
      pt_BR: '     *PERSONAGENS*____'
            +'Agile West:__Irmão adotivo de Rolf e__lider da WildBat Gang.____',
      en_US: '     *CHARACTERS*____'
            +'Agile West:__Rolf\'s adoptive brother__and WildBat Gang leader.____'
    },
    storyPg5: { //glossary.text.storyPg2[language]
      pt_BR: '     *PERSONAGENS*____'
            +'Habitantes da cidade:________________'
            +'WildBat Gang:______',
      en_US: '     *CHARACTERS*____'
            +'Townspeople:________________'
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
    gameoverHint1: { //glossary.text.gameoverHint1[language]
      pt_BR: 'DICA: Tente acertar o_sniper enquanto ele,_está atirando!',
      en_US: 'HINT: Try shooting the_sniper while he,_is shooting!'
    },
    gameoverHint2: { //glossary.text.gameoverHint2[language]
      pt_BR: 'DICA: Os tiros inimigos_de uma piranha pode_quebrar os cubos_de gelo!',
      en_US: "HINT: Pirana's_somersault can break_ice cubes!"
    },
    gameoverHint3: { //glossary.text.gameoverHint3[language]
      pt_BR: 'DICA: Snow não pode_pegar mais peixes_que o necessário_para passar de fase!',
      en_US: "HINT: Snow can't get_more fish than stage_requirement!"
    },
    gameoverHint4: { //glossary.text.gameoverHint4[language]
      pt_BR: 'DICA: Pontuações_altas garantem mais_vidas!',
      en_US: "HINT: High scores_reward extra lives!"
    },
    gameoverHint5: { //glossary.text.gameoverHint5[language]
      pt_BR: 'DICA: A Cada 7 fases_o jogo fica mais_difícil, mas também_aumenta o bônus_ao fim da fase!',
      en_US: "HINT: Every 7 stages_game gets harder,_but also increases_round clear bonus!"
    },
    gameoverHint6: { //glossary.text.gameoverHint6[language]
      pt_BR: 'DICA: Piranhas não_atacam Snow depois_de coletar todos os_peixes necessários!',
      en_US: "HINT: Piranas don't_attack Snow after_all required fish_were collected!"
    },
    finalstageMsg: { //glossary.text.finalstageMsg[language]
      pt_BR: 'Estou com a Melody!____Se quiser ela de volta__venha sozinho e me__encontre na antiga__delegacia...____Agile West',
      en_US: "I have Melody!____If you want her back__come alone and find__me at the old sheriff__station...____Agile West"
    },
    wingame1: { //glossary.text.wingame1[language]
      pt_BR: "A batalha acabou!____Rolf derrotou a WildBat__Gang e restaurou a paz__da cidade!____Parabéns!!!__Até o próximo jogo!",
      en_US: "The battle is over!____Rolf defeated WildBat__Gang and restored peace__to the town!____Congratulations!!!__See you next game!"
    },
    gameover: { //glossary.text.gameover[language]
      pt_BR: "    FIM DE JOGO!",
      en_US: "     GAME OVER!"
    }
	},
	// ...
};