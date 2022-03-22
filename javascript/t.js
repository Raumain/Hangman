window.addEventListener('DOMContentLoaded', () => {
  var canva = document.getElementById("draw");
  var ctx = canva.getContext("2d");
  ctx.beginPath();

  

  ctx.moveTo(40, 350); // PETITE BARRE HONRIZONTALE
  ctx.lineTo(230, 350);

  ctx.moveTo(90, 90); // BARRE VERTICALE
  ctx.lineTo(90, 350);

  ctx.moveTo(55, 350); // PETITE BARRE DIAGONALE DROITE
  ctx.lineTo(90, 320);

  ctx.moveTo(125, 350); // PETITE BARRE DIAGONALE GAUCHE
  ctx.lineTo(90, 320);

  ctx.moveTo(40, 90); // BARRE HORIZONTALE
  ctx.lineTo(240, 90);

  ctx.moveTo(90, 120); // PETITE BARRE DIAGONALE DROITE
  ctx.lineTo(120, 90);

  ctx.moveTo(200, 90); // CORDE
  ctx.lineTo(200, 130);

  ctx.moveTo(220, 150) // TETE
  ctx.arc(200,150,20,0,2*Math.PI); 

  ctx.moveTo(200, 170); // COU
  ctx.lineTo(200, 220);

  ctx.moveTo(200, 180); // BRAS GAUCHE
  ctx.lineTo(180, 220);

  ctx.moveTo(200, 180); // BRAS DROIT
  ctx.lineTo(220, 220);

  ctx.moveTo(200, 220); // JAMBE GAUCHE
  ctx.lineTo(180, 260);

  ctx.moveTo(200, 220); // JAMBE DROITE
  ctx.lineTo(220, 260);

  ctx.stroke();
  
}); 