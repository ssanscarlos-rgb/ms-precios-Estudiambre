// Datos de ejemplo del radar de precios. Los productos usan los mismos nombres que el catálogo del
// frontend (src/catalog.js); las tiendas, zonas y montos son de prueba: reemplazar por reales si se desea.

// Zona de cada tienda; `fila` arma una entrada con el mismo formato que las anteriores.
const ZONAS = {
  'Mega Plaza': 'Norte',
  'Super Ahorro': 'Centro',
  'Mini Mercado La Esquina': 'Campus',
  'Abastecedor Don Pepe': 'Sur',
  'Carnicería El Corral': 'Norte',
};
const fila = (id, tienda, precio, reportes) => ({ id, tienda, zona: ZONAS[tienda], precio, reportes });

module.exports = {
  'Arroz Tío Pelón 1 kg': [
    { id: 'arroz-1', tienda: 'Super Ahorro', zona: 'Centro', precio: 1450, reportes: 12 },
    { id: 'arroz-2', tienda: 'Mini Mercado La Esquina', zona: 'Campus', precio: 1600, reportes: 5 },
    { id: 'arroz-3', tienda: 'Mega Plaza', zona: 'Norte', precio: 1380, reportes: 20 },
    { id: 'arroz-4', tienda: 'Abastecedor Don Pepe', zona: 'Sur', precio: 1700, reportes: 2 },
  ],
  'Leche Dos Pinos 1 L': [
    { id: 'leche-1', tienda: 'Super Ahorro', zona: 'Centro', precio: 1100, reportes: 9 },
    { id: 'leche-2', tienda: 'Mega Plaza', zona: 'Norte', precio: 1050, reportes: 14 },
    { id: 'leche-3', tienda: 'Mini Mercado La Esquina', zona: 'Campus', precio: 1250, reportes: 4 },
  ],
  'Huevos docena': [
    { id: 'huevos-1', tienda: 'Mega Plaza', zona: 'Norte', precio: 2900, reportes: 11 },
    { id: 'huevos-2', tienda: 'Super Ahorro', zona: 'Centro', precio: 3100, reportes: 7 },
    { id: 'huevos-3', tienda: 'Abastecedor Don Pepe', zona: 'Sur', precio: 3300, reportes: 3 },
  ],
  'Pan cuadrado': [
    { id: 'pan-1', tienda: 'Panadería Central', zona: 'Centro', precio: 900, reportes: 6 },
    { id: 'pan-2', tienda: 'Super Ahorro', zona: 'Centro', precio: 1000, reportes: 8 },
  ],

  // Productos agregados para cubrir todo el catálogo del frontend (precios de ejemplo en colones).
  'Frijoles negros 900 g': [
    fila('frijoles-1', 'Mega Plaza', 1390, 15),
    fila('frijoles-2', 'Super Ahorro', 1480, 9),
    fila('frijoles-3', 'Mini Mercado La Esquina', 1600, 4),
    fila('frijoles-4', 'Abastecedor Don Pepe', 1650, 2),
  ],
  'Café 1820 molido 250 g': [
    fila('cafe-1', 'Mega Plaza', 2150, 13),
    fila('cafe-2', 'Super Ahorro', 2290, 8),
    fila('cafe-3', 'Mini Mercado La Esquina', 2450, 5),
    fila('cafe-4', 'Abastecedor Don Pepe', 2500, 1),
  ],
  'Aceite vegetal 1 L': [
    fila('aceite-1', 'Mega Plaza', 2050, 10),
    fila('aceite-2', 'Super Ahorro', 2250, 6),
    fila('aceite-3', 'Mini Mercado La Esquina', 2400, 3),
    fila('aceite-4', 'Abastecedor Don Pepe', 2480, 2),
  ],
  'Azúcar 1 kg': [
    fila('azucar-1', 'Mega Plaza', 890, 18),
    fila('azucar-2', 'Super Ahorro', 950, 9),
    fila('azucar-3', 'Mini Mercado La Esquina', 1050, 4),
    fila('azucar-4', 'Abastecedor Don Pepe', 1100, 3),
  ],
  'Pasta 400 g': [
    fila('pasta-1', 'Mega Plaza', 780, 12),
    fila('pasta-2', 'Super Ahorro', 850, 7),
    fila('pasta-3', 'Mini Mercado La Esquina', 950, 4),
    fila('pasta-4', 'Abastecedor Don Pepe', 990, 2),
  ],
  'Atún en lata': [
    fila('atun-1', 'Mega Plaza', 1150, 14),
    fila('atun-2', 'Super Ahorro', 1290, 8),
    fila('atun-3', 'Mini Mercado La Esquina', 1380, 5),
    fila('atun-4', 'Abastecedor Don Pepe', 1450, 1),
  ],
  'Pollo entero': [
    fila('pollo-1', 'Carnicería El Corral', 4300, 9),
    fila('pollo-2', 'Mega Plaza', 4600, 12),
    fila('pollo-3', 'Super Ahorro', 4850, 6),
    fila('pollo-4', 'Abastecedor Don Pepe', 5100, 2),
  ],
  'Papel higiénico 4 rollos': [
    fila('papel-1', 'Mega Plaza', 1650, 11),
    fila('papel-2', 'Super Ahorro', 1790, 7),
    fila('papel-3', 'Mini Mercado La Esquina', 1950, 4),
    fila('papel-4', 'Abastecedor Don Pepe', 2050, 2),
  ],
  'Jabón de baño': [
    fila('jabon-1', 'Mega Plaza', 550, 10),
    fila('jabon-2', 'Super Ahorro', 620, 6),
    fila('jabon-3', 'Mini Mercado La Esquina', 700, 3),
    fila('jabon-4', 'Abastecedor Don Pepe', 750, 1),
  ],
  'Detergente 1 kg': [
    fila('detergente-1', 'Mega Plaza', 2450, 13),
    fila('detergente-2', 'Super Ahorro', 2650, 7),
    fila('detergente-3', 'Mini Mercado La Esquina', 2900, 3),
    fila('detergente-4', 'Abastecedor Don Pepe', 3050, 2),
  ],
  'Agua embotellada 1.5 L': [
    fila('agua-1', 'Mega Plaza', 850, 16),
    fila('agua-2', 'Super Ahorro', 920, 9),
    fila('agua-3', 'Mini Mercado La Esquina', 1100, 6),
    fila('agua-4', 'Abastecedor Don Pepe', 1150, 2),
  ],
};
