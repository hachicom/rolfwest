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
            +'enquanto Agile queria__apenas poder e fama.____20 anos se passaram__e agora Agile cria__a Batgang, um temido__grupo de morcegos__'            
            +'fora-da-lei, e com__eles Agile invade sua__terra natal.____Atrapalhado e valente,__o jovem Rolf parte__para conquistar o__'
            +'coração da bela__filha do prefeito,__Melody Smith, e__proteger sua cidade__'
            +'das garras de Agile.___',
      en_US: '       *STORY*____'
            +'There was a legendary__Sheriff known as__Billy West.__Billy and his wife__adopted two war__orphaned kids,__'
            +'Rolf the wolf__and Agile the bat.____Both were raised__in the path of justice,__but only Rolf followed__Billy\'s steps,__'
            +'while Agile only__wanted power and fame.____20 years have passed__and now Agile creates__the Batgang, a feared__group of outlaw__'            
            +'bats, and with them__Agile invades his__hometown.____Goofy but also brave,__the young Rolf goes__to win the heart__'
            +'of the mayor\'s__beautiful daughter,__Melody Smith, and__protect his city__'
            +'from Agile\'s hands.___'
    },
		tutorialPg2: { //glossary.text.tutorialPg2[language]
      pt_BR: '  ==COMO JOGAR==__Desvie do gelo____'
            +'Colete peixes____'
            +'Evite piranhas____'
            +'Cada fase requer uma_quantidade de peixes_a ser coletada.__Ao coletar os peixes_'
            +'leve-os para a Yuki_para passar de fase!_',
      en_US: '  ==HOW TO PLAY==__Avoid ice cubes____'
            +'Collect fish____'
            +'Avoid piranas____'
            +'Each stage requires_a quantity of fish_to be collected.__After collecting_'
            +'them, go to Yuki_to clear the stage!_'
    },
		tutorialPg3: { //glossary.text.tutorialPg3[language]
      pt_BR: '  ==COMO JOGAR==__Todo sétimo round_é um round bônus!_Colete corações_para ganhar pontos_______'
            +'Ganhe vida atingindo_a pontuação abaixo:__'
            +'->5000_->10000_->20000_->40000_->80000___Tente marcar 99999_pra zerar o jogo!',
      en_US: '  ==HOW TO PLAY==__Every 7th round_is a bonus round!_Collect hearts_to score points_______'
            +'Extra lives rewarded_at scores below:__'
            +'->5000_->10000_->20000_->40000_->80000___Try scoring 99999_to beat the game!'
    },
		municao: { //glossary.text.peixe[language]
      pt_BR: 'BALAS',
      en_US: 'AMMO',
    },
		colete: { //glossary.text.colete[language]
      pt_BR: 'COLETE ',
      en_US: 'COLLECT '
    },
		peixes: { //glossary.text.peixes[language]
      pt_BR: ' PEIXES!',
      en_US: ' FISH!'
    },
		alertaReload: { //glossary.text.alertaReload[language]
      pt_BR: '  RECARREGUE!!!',
      en_US: '     RELOAD!!!'
    },
		coracoes: { //glossary.text.coracoes[language]
      pt_BR: ' CORAçÕES: ',
      en_US: '   HEARTS: '
    },
    gameoverHint1: { //glossary.text.gameoverHint1[language]
      pt_BR: 'DICA: Tente pegar as_piranhas pela cauda,_vale 100 pontos!',
      en_US: 'HINT: Try getting_piranas by tail,_scores 100 points!'
    },
    gameoverHint2: { //glossary.text.gameoverHint2[language]
      pt_BR: 'DICA: A cambalhota_de uma piranha pode_quebrar os cubos_de gelo!',
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
      pt_BR: 'Estou com a Melody!__Se quiser ela de volta_venha sozinho e me_encontre na antiga_delegacia...___Agile West',
      en_US: "I have Melody!__If you want her back_come alone and find_me at the old sheriff_station...___Agile West"
    },
    wingame1: { //glossary.text.wingame1[language]
      pt_BR: "A batalha chegou ao fim!__Rolf derrotou a temida Batgang,_restaurando a paz da cidade!___Parabéns!!!_Nos vemos no próximo jogo!",
      en_US: "The battle is over!__Rolf defeated the feared Batgang_and restored peace to the town!___Congratulations!!!_See you in the next game!"
    },
    wingame2: { //glossary.text.wingame2[language]
      pt_BR: "      PARABÉNS!__Você zerou o placar_ de Snow & Yuki!!!______________ Até o próximo jogo",
      en_US: "  CONGRATULATIONS!__ You got max score_ at Snow & Yuki!!!______________ See you next game!"
    },
    gameover: { //glossary.text.gameover[language]
      pt_BR: "    FIM DE JOGO!",
      en_US: "     GAME OVER!"
    }
	},
	// ...
};