<?php
echo "<pre>";
flush();
sleep(1);

$vArquivo = $_GET['file'].".csv";

if (($handle = fopen($vArquivo, "r")) !== FALSE)
{
  $vr_TamanhoTotal = count (file ($vArquivo));
  while (($ar_Conteudo = fgetcsv($handle, 8000, ",", '"')) !== FALSE)
  {
    foreach($ar_Conteudo as $k=>$conteudo){
      $ar_Conteudo[$k] = $conteudo - 1;
    }
    
    echo '['.$ar_Conteudo[0].','.$ar_Conteudo[1].','.$ar_Conteudo[2].','.$ar_Conteudo[3].','.$ar_Conteudo[4].','.
         $ar_Conteudo[5].','.$ar_Conteudo[6].','.$ar_Conteudo[7].','.$ar_Conteudo[8].','.$ar_Conteudo[9].'],<br>';
  }
}
echo "</pre>";

?>
