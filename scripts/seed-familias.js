// Familias de productos del radar de precios: [nombre, precio base en colones].
// El PRIMER nombre de cada familia es el producto original (con sus filas escritas a mano en seed-data.js);
// los demás son tipos/presentaciones y sus precios por tienda se generan a partir del precio base.
//  - esenciales (canasta básica): 7 tipos cada uno
//  - específicos: 3 tipos cada uno
// Los nombres son de ejemplo; los precios son de prueba.
module.exports = {
  esenciales: {
    arroz: [
      ['Arroz Tío Pelón 1 kg', 1450], ['Arroz Tío Pelón 2 kg', 2750], ['Arroz Faisán 1 kg', 1500], ['Arroz Pozuelo 1 kg', 1420],
      ['Arroz integral 1 kg', 1900], ['Arroz precocido 1 kg', 1650], ['Arroz 80/20 1 kg', 1250],
    ],
    frijoles: [
      ['Frijoles negros 900 g', 1480], ['Frijoles rojos 900 g', 1550], ['Frijoles negros 1.8 kg', 2800], ['Frijoles negros en lata 430 g', 980],
      ['Frijoles molidos en bolsa 400 g', 1150], ['Frijoles blancos 900 g', 1700], ['Frijoles tiernos 450 g', 1350],
    ],
    leche: [
      ['Leche Dos Pinos 1 L', 1100], ['Leche descremada 1 L', 1180], ['Leche semidescremada 1 L', 1150], ['Leche deslactosada 1 L', 1450],
      ['Leche en polvo 400 g', 3900], ['Leche entera 1 L', 1050], ['Leche chocolatada 1 L', 1350],
    ],
    huevos: [
      ['Huevos docena', 3100], ['Huevos 30 unidades', 7400], ['Huevos media docena', 1650], ['Huevos de campo docena', 3800],
      ['Huevos grandes docena', 3300], ['Huevos extra grandes docena', 3600], ['Huevos orgánicos docena', 4500],
    ],
    pan: [
      ['Pan cuadrado', 1000], ['Pan cuadrado integral', 1350], ['Pan de hamburguesa 8 unidades', 1500], ['Pan de hot dog 8 unidades', 1450],
      ['Pan baguette', 650], ['Pan tostado 200 g', 1100], ['Pan árabe 6 unidades', 1250],
    ],
    aceite: [
      ['Aceite vegetal 1 L', 2250], ['Aceite vegetal 2 L', 4300], ['Aceite de oliva 500 ml', 4800], ['Aceite de girasol 1 L', 2600],
      ['Aceite de soya 1 L', 2150], ['Aceite de canola 1 L', 2450], ['Aceite de maíz 1 L', 2700],
    ],
    azucar: [
      ['Azúcar 1 kg', 950], ['Azúcar 2 kg', 1800], ['Azúcar morena 1 kg', 1100], ['Azúcar integral 1 kg', 1450],
      ['Azúcar en polvo 500 g', 900], ['Azúcar light 500 g', 1600], ['Azúcar 5 kg', 4400],
    ],
    pollo: [
      ['Pollo entero', 4850], ['Pechuga de pollo 1 kg', 4700], ['Muslos de pollo 1 kg', 3300], ['Alitas de pollo 1 kg', 3600],
      ['Pollo molido 500 g', 2700], ['Pollo en trozos 1 kg', 3200], ['Menudo de pollo 500 g', 1500],
    ],
  },
  especificos: {
    cafe: [['Café 1820 molido 250 g', 2290], ['Café 1820 molido 500 g', 4300], ['Café instantáneo 100 g', 3400]],
    pasta: [['Pasta 400 g', 850], ['Pasta espagueti 400 g', 880], ['Pasta tornillo 400 g', 920]],
    atun: [['Atún en lata', 1290], ['Atún en agua 140 g', 1250], ['Atún en aceite 140 g', 1320]],
    papel: [['Papel higiénico 4 rollos', 1790], ['Papel higiénico 12 rollos', 4900], ['Papel higiénico doble hoja 4 rollos', 2100]],
    jabon: [['Jabón de baño', 620], ['Jabón de baño antibacterial', 780], ['Jabón líquido 500 ml', 2200]],
    detergente: [['Detergente 1 kg', 2650], ['Detergente 2 kg', 4900], ['Detergente líquido 1 L', 3300]],
    agua: [['Agua embotellada 1.5 L', 920], ['Agua embotellada 600 ml', 600], ['Agua embotellada 4 L', 1800]],
  },
};
