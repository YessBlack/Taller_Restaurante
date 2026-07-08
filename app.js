const prompt = require('prompt-sync')()

// Formatea números como pesos colombianos
// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
const formatearPrecio = (precio) => {
  return `$${precio.toLocaleString('es-CO')}`
}

const menu = [
  {
    nombre: 'Salchipapa Sencilla',
    precio: 15000,
    categoria: 'comidas_rapidas',
    estaDisponible: true
  },
  {
    nombre: 'Picada Sencilla',
    precio: 30000,
    categoria: 'comidas_rapidas',
    estaDisponible: true
  },
  {
    nombre: 'Almuerzo Ejecutivo',
    precio: 40000,
    categoria: 'almuerzos',
    estaDisponible: true
  },
  {
    nombre: 'Hamburguesa doble Carne',
    precio: 25000,
    categoria: 'comidas_rapidas',
    estaDisponible: true
  },
  {
    nombre: 'Coca Cola 1.5L',
    precio: 6000,
    categoria: 'bebidas',
    estaDisponible: false
  },
  {
    nombre: 'Jugo Natural Naranja',
    precio: 5000,
    categoria: 'bebidas',
    estaDisponible: true
  }
]

// Como leerias el precio del segundo plato
// console.log(menu[1].precio)

// Reto 1: Funcion menu
const mostrarMenu = (menu) => {
  for (let i = 0; i < menu.length; i++) {
    console.log(
      `  ${i + 1} - ${menu[i].nombre} (${formatearPrecio(menu[i].precio)})`
    )
  }
}

// mostrarMenu(menu)

// Reto 2: Filtro solo disponibles
const soloDisponibles = (menu) => {
  const disponbiles = []

  for (const item of menu) {
    if (item.estaDisponible) {
      disponbiles.push(item)
    }
  }

  return disponbiles
}

// Reto 3: Agregar y eliminar pedidos
const pedidos = []
const disponbiles = soloDisponibles(menu)
pedidos.push(disponbiles[0])
pedidos.push(disponbiles[1])

// 3.1 Mesa cancela el ultimo pedido
const pedidoEliminado = disponbiles.pop()
// console.log(`Se ha quitado ${pedidoEliminado.nombre} de su pedido`)

// Reto 4: Calcular cuenta con impuestos
const calcularCuenta = (pedidos) => {
  let subtotal = 0;

  for (const producto of pedidos) {
    subtotal += producto.precio
  }

  const iva = subtotal * 0.19
  const total = subtotal + iva

  // Profe se que esto no se solicito, pero lo agregue para mejorar la impresión de la factura
  return {
    subtotal,
    iva,
    total
  }
}

const totalConImpuestos = calcularCuenta(pedidos)
// console.log(totalConImpuestos.total)
// Error de referencia, en este ambito no existe la variable, solo vive en calcularCuenta 
// console.log(iva)

// Reto 5: Menu de pedidos
let opcion = 0;
const pedidosCliente = []

do {
  console.log("\n============ 🍔 MENU RESTAURANTE ============");

  const items = soloDisponibles(menu);
  mostrarMenu(items);

  console.log("  0 - Salir");
  console.log("---------------------------------------------")

  opcion = Number(prompt("👉 Seleccione una opción: "));

  if (
    Number.isNaN(opcion) ||
    opcion < 0 ||
    opcion > items.length
  ) {
    console.log("❌ Esta opción no es válida, intenta de nuevo\n");
    continue;
  }

  if (opcion === 0) break

  const productoSeleccionado = items[opcion - 1]
  pedidosCliente.push(productoSeleccionado)
  console.log(`✅ Agregaste ${productoSeleccionado.nombre}\n`)
} while (true);

const totalPedido = calcularCuenta(pedidosCliente)
console.log("\n================ 🧾 Factura ================")

if (pedidosCliente.length === 0) {
  console.log("\nNo se agregaron productos al pedido.\n")
  return
}

for (const producto of pedidosCliente) {
  console.log(`  ${producto.nombre} ${formatearPrecio(producto.precio)}`)
}

console.log("---------------------------------------------")
console.log(`Subtotal: ${formatearPrecio(totalPedido.subtotal)}`)
console.log(`Valor del IVA: ${formatearPrecio(totalPedido.iva)}`)
console.log(`Total (IVA incluido): ${formatearPrecio(totalPedido.total)}`)
console.log("=============================================\n")

// Bonus: Filtro por categoria
const platosPorCategoria = (menu, categoria) => {
  return menu.filter(item => item.categoria === categoria)
}

platosPorCategoria(menu, 'comidas_rapidas')