const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/sync');

const basePath = path.join(__dirname, '../public/assets/ImagesBack');
const salida = path.join(__dirname, '../public/assets/catalogo.json');
const csvRuta = path.join(__dirname, '../public/relacionRopa.csv');

console.log('📁 Ruta CSV:', csvRuta);
console.log('¿Existe?', fs.existsSync(csvRuta));

let nombresMap = {};
let preciosMap = {};

if (fs.existsSync(csvRuta)) {
  const contenidoCSV = fs.readFileSync(csvRuta, 'utf-8');

  const registros = parse.parse(contenidoCSV, {
    delimiter: ';',
    columns: ['id', 'nombre', 'precio'],
    skip_empty_lines: true,
    trim: true
  });

  registros.forEach(({ id, nombre, precio }) => {
    nombresMap[id] = nombre;
    preciosMap[id] = precio;
    console.log(nombre, precio);
  });
}

function formatearPrecio(precioRaw) {
  return precioRaw
    .split('/')
    .map(p => {
      const num = parseInt(p.replace(/\D/g, ''), 10);
      return isNaN(num) ? '$ ???' : '$' + num.toLocaleString('es-CO');
    })
    .join(' / ');
}


function buscarImagenesRecursivas(relativa, absoluta, categoria) {
  const contenido = fs.readdirSync(absoluta);
  const imagenes = contenido.filter(f => /\.(jpe?g|png)$/i.test(f));
  const id = relativa.replace(/\//g, '_');

  if (imagenes.length > 0) {
    return [{
      id: relativa.replace(/\//g, '_'),
      name: nombresMap[id] || id.replace(/_/g, ' '),
      price: preciosMap[id] ? formatearPrecio(preciosMap[id]) : '$ ???',
      categoria,
      images: imagenes.map(img => `assets/ImagesBack/${categoria}/${relativa}/${img}`)
    }];
  }

  // Si no hay imágenes, buscar en subcarpetas
  return contenido
    .filter(sub => fs.statSync(path.join(absoluta, sub)).isDirectory())
    .flatMap(sub => buscarImagenesRecursivas(path.join(relativa, sub), path.join(absoluta, sub), categoria));
}

const catalogo = [];

const categorias = fs.readdirSync(basePath);
categorias.forEach(categoria => {
  const categoriaPath = path.join(basePath, categoria);
  if (!fs.statSync(categoriaPath).isDirectory()) return;

  const productos = fs.readdirSync(categoriaPath);
  productos.forEach(producto => {
    const productoRelativo = producto;
    const productoAbsoluto = path.join(categoriaPath, producto);
    const resultado = buscarImagenesRecursivas(productoRelativo, productoAbsoluto, categoria);
    catalogo.push(...resultado);
  });
});

fs.writeFileSync(salida, JSON.stringify(catalogo, null, 2));
console.log('✅ Catálogo generado con productos normales + anidados');