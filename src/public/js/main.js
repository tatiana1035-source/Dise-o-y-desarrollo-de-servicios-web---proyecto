// =====================
// MENÚ RESPONSIVE
// =====================

function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('active');
}
// =====================
// UTILIDADES
// =====================
function mostrarError(tbodyId, cols, msg) {
  const tbody = document.getElementById(tbodyId);
  if (tbody) tbody.innerHTML = `<tr><td colspan="${cols}" class="text-center" style="color:red">${msg}</td></tr>`;
}

function mostrarVacio(tbodyId, cols, msg = 'Sin registros') {
  const tbody = document.getElementById(tbodyId);
  if (tbody) tbody.innerHTML = `<tr><td colspan="${cols}" class="text-center">${msg}</td></tr>`;
}

// Modal genérico
function abrirModal(id) { document.getElementById(id).style.display = 'flex'; }
function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }

// =====================
// PRODUCTOS
// =====================

async function cargarProductos() {
  const tbody = document.getElementById('tablaProductos');
  if (!tbody) return;
  try {
    const res = await fetch('/api/productos', {
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaProductos', 6);
    tbody.innerHTML = data.map(p => `
      <tr>
        <td>${p.id_producto}</td>
        <td>${p.nombre}</td>
        <td>${p.id_categoria ? p.id_categoria : '-'}</td>
        <td>${p.cantidad}</td>
        <td>$${parseFloat(p.precio).toLocaleString('es-CO')}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProducto(${p.id_producto})">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${p.id_producto})">🗑️</button>
        </td>
      </tr>`).join('');
  } catch (e) {
    mostrarError('tablaProductos', 6, 'Error al cargar productos');
  }
}

async function guardarProducto() {
  const id = document.getElementById('productoId').value;
  const body = {
    nombre: document.getElementById('pNombre').value,
    precio: document.getElementById('pPrecio').value,
    cantidad: document.getElementById('pCantidad').value,
    stock_minimo: document.getElementById('pStockMin').value,
    codigo_producto: document.getElementById('pCodigo').value,
    descripcion: document.getElementById('pDescripcion').value,
    id_categoria: document.getElementById('pCategoria').value || null,
    id_proveedor: document.getElementById('pProveedor').value || null,
    fecha_registro: new Date().toISOString().split('T')[0],
    activo: 1
  };
  
  // Usa las rutas con /api
  const url = id ? `/api/productos/${id}` : '/api/productos';
  const method = id ? 'PUT' : 'POST';
  try {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error();
    cerrarModal('modalProducto');
    window.location.reload(); // Recarga la vista para ver los cambios
  } catch {
    alert('Error al guardar el producto');
  }
}

async function editarProducto(id) {
  try {
    const res = await fetch(`/api/productos/${id}`);
    const p = await res.json();
    document.getElementById('productoId').value = p.id_producto;
    document.getElementById('pNombre').value = p.nombre;
    document.getElementById('pPrecio').value = p.precio;
    document.getElementById('pCantidad').value = p.cantidad;
    document.getElementById('pStockMin').value = p.stock_minimo;
    document.getElementById('pCodigo').value = p.codigo_producto;
    document.getElementById('pDescripcion').value = p.descripcion;
    document.getElementById('pCategoria').value = p.id_categoria ?? '';
    document.getElementById('pProveedor').value = p.id_proveedor ?? '';
    document.getElementById('modalTitulo').textContent = 'Editar Producto';
    abrirModal('modalProducto');
  } catch {
    alert('Error al cargar el producto');
  }
}

async function eliminarProducto(id) {
  if (!confirm('¿Eliminar este producto?')) return;
  try {
    await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    window.location.reload(); // Recarga la vista tras eliminar
  } catch {
    alert('Error al eliminar');
  }
}

// Limpieza manual campo por campo para evitar que falle por falta de etiqueta <form>
function nuevoProducto() {
  document.getElementById('productoId').value = '';
  document.getElementById('pNombre').value = '';
  document.getElementById('pPrecio').value = '';
  document.getElementById('pCantidad').value = '';
  document.getElementById('pStockMin').value = '';
  document.getElementById('pCodigo').value = '';
  document.getElementById('pDescripcion').value = '';
  document.getElementById('pCategoria').value = '';
  document.getElementById('pProveedor').value = '';
  document.getElementById('modalTitulo').textContent = 'Nuevo Producto';
  abrirModal('modalProducto');
}

// =====================
// CATEGORÍAS
// =====================
async function cargarCategorias() {
  const tbody = document.getElementById('tablaCategorias');
  if (!tbody) return;
  try {
    const res = await fetch('/api/categorias');
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaCategorias', 4);
    tbody.innerHTML = data.map(c => `
      <tr>
        <td>${c.id_categoria}</td>
        <td>${c.nombre}</td>
        <td>${c.descripcion ?? '-'}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarCategoria(${c.id_categoria})">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarCategoria(${c.id_categoria})">🗑️</button>
        
        </td>
      </tr>`).join('');
  } catch {
    mostrarError('tablaCategorias', 4, 'Error al cargar categorías');
  }
}

async function editarCategoria(id) {
  try {
    const res = await fetch(`/api/categorias/${id}`);
    const c = await res.json();
    document.getElementById('categoriaId').value = c.id_categoria;
    document.getElementById('cNombre').value = c.nombre;
    document.getElementById('cDescripcion').value = c.descripcion ?? '';
    document.getElementById('modalTituloCategoria').textContent = 'Editar Categoría';
    abrirModal('modalCategoria');
  } catch {
    alert('Error al cargar la categoría');
  }
}
async function eliminarCategoria(id) {
  if (!confirm('¿Eliminar esta categoría?')) return;
  await fetch(`/api/categorias/${id}`, { method: 'DELETE' });
  window.location.reload();
}

function nuevaCategoria() {
  document.getElementById('categoriaId').value = '';
  document.getElementById('cNombre').value = '';
  document.getElementById('cDescripcion').value = '';
  document.getElementById('modalTituloCategoria').textContent = 'Nueva Categoría';
  abrirModal('modalCategoria');
}
async function guardarCategoria() {
  const id = document.getElementById('categoriaId').value;
  const body = {
    nombre: document.getElementById('cNombre').value,
    descripcion: document.getElementById('cDescripcion').value
  };
  const url = id ? `/api/categorias/${id}` : '/api/categorias';
  const method = id ? 'PUT' : 'POST';
  try {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error();
    cerrarModal('modalCategoria');
    window.location.reload();
  } catch {
    alert('Error al guardar la categoría');
  }
}
// =====================
// PROVEEDORES
// =====================
async function cargarProveedores() {
  const tbody = document.getElementById('tablaProveedores');
  if (!tbody) return;
  try {
    const res = await fetch('/api/proveedores');
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaProveedores', 7);
    tbody.innerHTML = data.map(p => `
      <tr>
        <td>${p.id_proveedor}</td>
        <td>${p.nombre}</td>
        <td>${p.direccion ?? '-'}</td>
        <td>${p.telefono ?? '-'}</td>       
        <td>${p.email ?? '-'}</td>
        <td>${p.ciudad ?? '-'}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProveedor(${p.id_proveedor})">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarProveedor(${p.id_proveedor})">🗑️</button>
        </td>
      </tr>`).join('');
  } catch {
    mostrarError('tablaProveedores', 7, 'Error al cargar proveedores');
  }
}
async function eliminarProveedor(id) {
  if (!confirm('¿Eliminar este proveedor?')) return;
  await fetch(`/api/proveedores/${id}`, { method: 'DELETE' });
  window.location.reload();
}
function nuevoProveedor() {
  document.getElementById('proveedorId').value = '';
  document.getElementById('provNombre').value = '';
  document.getElementById('provTelefono').value = '';
  document.getElementById('provDireccion').value = '';
  document.getElementById('provEmail').value = '';
  document.getElementById('provCiudad').value = '';
  document.getElementById('modalTituloProveedor').textContent = 'Nuevo Proveedor';
  abrirModal('modalProveedor');
}
async function guardarProveedor() {
  const id = document.getElementById('proveedorId').value;
  const body = {
    nombre: document.getElementById('provNombre').value,
    telefono: document.getElementById('provTelefono').value,
    direccion: document.getElementById('provDireccion').value,
    email: document.getElementById('provEmail').value,
    ciudad: document.getElementById('provCiudad').value
  };
  const url = id ? `/api/proveedores/${id}` : '/api/proveedores';
  const method = id ? 'PUT' : 'POST';
  try {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error();
    cerrarModal('modalProveedor');
    window.location.reload();
  } catch {
    alert('Error al guardar el proveedor');
  }
}
async function editarProveedor(id) {
  try {
    const res = await fetch(`/api/proveedores/${id}`);
    const p = await res.json();
    document.getElementById('proveedorId').value = p.id_proveedor;
    document.getElementById('provNombre').value = p.nombre;
    document.getElementById('provTelefono').value = p.telefono ?? '';
    document.getElementById('provDireccion').value = p.direccion ?? '';
    document.getElementById('provEmail').value = p.email ?? '';
    document.getElementById('provCiudad').value = p.ciudad ?? '';
    document.getElementById('modalTituloProveedor').textContent = 'Editar Proveedor';
    abrirModal('modalProveedor');
  } catch {
    alert('Error al cargar el proveedor');
  }
}

// =====================
// PEDIDOS
// =====================
async function cargarPedidos() {
  const tbody = document.getElementById('tablaPedidos');
  if (!tbody) return;
  try {
    const res = await fetch('/api/pedidos');
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaPedidos', 6);
    tbody.innerHTML = data.map(p => `
      <tr>
        <td>${p.id_pedido}</td>
        <td>${p.id_proveedor ?? '-'}</td>
        <td>${p.estado ?? '-'}</td>
        <td>${p.total ?? '-'}</td>
        <td>${p.fecha ? p.fecha.split('T')[0] : '-'}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarPedido(${p.id_pedido})">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarPedido(${p.id_pedido})">🗑️</button>
        </td>
      </tr>`).join('');
  } catch {
    mostrarError('tablaPedidos', 6, 'Error al cargar pedidos');
  }
}

async function editarPedido(id) {
  try {
    const res = await fetch(`/api/pedidos/${id}`);
    const p = await res.json();
    document.getElementById('pedidoId').value = p.id_pedido;
    document.getElementById('pedProveedor').value = p.id_proveedor ?? '';
    document.getElementById('pedEstado').value = p.estado ?? 'pendiente';
    document.getElementById('pedTotal').value = p.total ?? '';
    document.getElementById('modalTituloPedido').textContent = 'Editar Pedido';
    abrirModal('modalPedido');
  } catch {
    alert('Error al cargar el pedido');
  }
}

async function eliminarPedido(id) {
  if (!confirm('¿Eliminar este pedido?')) return;
  try {
    await fetch(`/api/pedidos/${id}`, { method: 'DELETE' });
    window.location.reload();
  } catch {
    alert('Error al eliminar el pedido');
  }
}

function nuevoPedido() {
  document.getElementById('pedidoId').value = '';
  document.getElementById('pedProveedor').value = '';
  document.getElementById('pedEstado').value = 'pendiente';
  document.getElementById('pedTotal').value = '';
  document.getElementById('modalTituloPedido').textContent = 'Nuevo Pedido';
  abrirModal('modalPedido');
}

async function guardarPedido() {
  const id = document.getElementById('pedidoId').value;
  const body = {
    id_proveedor: document.getElementById('pedProveedor').value || null,
    estado: document.getElementById('pedEstado').value,
    total: document.getElementById('pedTotal').value || 0,
    fecha: new Date().toISOString().split('T')[0]
  };
  const url = id ? `/api/pedidos/${id}` : '/api/pedidos';
  const method = id ? 'PUT' : 'POST';
  try {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error();
    cerrarModal('modalPedido');
    window.location.reload();
  } catch {
    alert('Error al guardar el pedido');
  }
}

// =====================
// MOVIMIENTOS
// =====================
async function cargarMovimientos() {
  const tbody = document.getElementById('tablaMovimientos');
  if (!tbody) return;
  try {
    const res = await fetch('/api/movimientos');
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaMovimientos', 5);
    tbody.innerHTML = data.map(m => `
      <tr>
        <td>${m.id_movimiento}</td>
        <td>${m.id_producto ?? '-'}</td>
        <td>${m.tipo ?? '-'}</td>
        <td>${m.cantidad}</td>
        <td>${m.fecha ? new Date(m.fecha).toLocaleDateString('es-CO') : '-'}</td>
        <td>${m.id_usuario ?? '-'}</td>

      </tr>`).join('');
  } catch {
    mostrarError('tablaMovimientos', 5, 'Error al cargar movimientos');
  }
}
   function nuevoMovimiento() {
    // Limpiar los campos
    document.getElementById('movimientoId').value = '';
    document.getElementById('mProducto').value = '';
    document.getElementById('mTipo').value = '';
    document.getElementById('mCantidad').value = '';
    abrirModal( 'modalMovimiento');
   }
  async function guardarMovimiento() {
  const id = document.getElementById('movimientoId').value;
  console.log('ID:', id);
  console.log('URL:', id ? `/api/movimientos/${id}` : '/api/movimientos');
  
  const body = {
    id_producto: document.getElementById('mProducto').value,
    tipo: document.getElementById('mTipo').value,
    cantidad: document.getElementById('mCantidad').value,
    fecha: new Date().toISOString().split('T')[0],
    id_almacen: 1,
    id_usuario: null
  };
  console.log('Body:', body);
  
  const url = id ? `/api/movimientos/${id}` : '/api/movimientos';
  const method = id ? 'PUT' : 'POST';
  try {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error();
    cerrarModal('modalMovimiento');
    window.location.reload();
  } catch {
    alert('Error al guardar el movimiento');
  }
}
// =====================
// ALERTAS
// =====================
async function cargarAlertas() {
  const tbody = document.getElementById('tablaAlertas');
  if (!tbody) return;
  try {
    const res = await fetch('/api/alertas');
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaAlertas', 6);
    tbody.innerHTML = data.map(a => `
      <tr>
        <td>${a.id_alertas}</td>
        <td>${a.id_producto ?? '-'}</td>
        <td>${a.mensaje ?? '-'}</td>
        <td>${a.tipo ?? '-'}</td>
        <td>${a.estado ?? '-'}</td>
        <td>${a.fecha ? new Date(a.fecha).toLocaleDateString('es-CO') : '-'}</td>
      </tr>`).join(''); 
  } catch {
    mostrarError('tablaAlertas', 6, 'Error al cargar alertas');
  }
}

// ================
// USUARIOS
//=================
async function cargarUsuarios() {
  const tbody = document.getElementById('tablaUsuarios');
  if (!tbody) return;
  try {
    const res = await fetch('/api/usuarios');
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaUsuarios', 5);
    tbody.innerHTML = data.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.nombre ?? '-'}</td>
        <td>${u.correo ?? '-'}</td>
        <td>${u.rol ?? '-'}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarUsuario(${u.id})">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${u.id})">🗑️</button>
        </td>
      </tr>`).join('');
  } catch {
    mostrarError('tablaUsuarios', 5, 'Error al cargar usuarios');
  }
}

function nuevoUsuario() {
  document.getElementById('usuarioId').value = '';
  document.getElementById('uNombre').value = '';
  document.getElementById('uCorreo').value = '';
  document.getElementById('uRol').value = 'auxiliar';
  document.getElementById('uClave').value = '';
  document.getElementById('modalTituloUsuario').textContent = 'Nuevo Usuario';
  abrirModal('modalUsuario');
}

async function editarUsuario(id) {
  try {
    const res = await fetch(`/api/usuarios/${id}`);
    const u = await res.json();
    document.getElementById('usuarioId').value = u.id;
    document.getElementById('uNombre').value = u.nombre;
    document.getElementById('uCorreo').value = u.correo;
    document.getElementById('uRol').value = u.rol;
    document.getElementById('uClave').value = '';
    document.getElementById('modalTituloUsuario').textContent = 'Editar Usuario';
    abrirModal('modalUsuario');
  } catch {
    alert('Error al cargar el usuario');
  }
}

async function eliminarUsuario(id) {
  if (!confirm('¿Eliminar este usuario?')) return;
  try {
    await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
    window.location.reload();
  } catch {
    alert('Error al eliminar el usuario');
  }
}

async function guardarUsuario() {
  const id = document.getElementById('usuarioId').value;
  const body = {
    nombre: document.getElementById('uNombre').value,
    correo: document.getElementById('uCorreo').value,
    rol: document.getElementById('uRol').value,
    clave: document.getElementById('uClave').value
  };
  const url = id ? `/api/usuarios/${id}` : '/api/usuarios';
  const method = id ? 'PUT' : 'POST';
  try {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error();
    cerrarModal('modalUsuario');
    window.location.reload();
  } catch {
    alert('Error al guardar el usuario');
  }
}

//=====================
//HISTORIAL
//=====================

async function cargarHistorial() {
  const tbody = document.getElementById('tablaHistorial');
  if (!tbody) return;
  try {
    const res = await fetch('/api/historial');
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaHistorial', 5);
    tbody.innerHTML = data.map(h => `
      <tr>
        <td>${h.id_historial}</td>
        <td>${h.accion ?? '-'}</td>
        <td>${h.descripcion ?? '-'}</td>
        <td>${h.id_usuario ?? '-'}</td>
        <td>${h.fecha ? new Date(h.fecha).toLocaleDateString('es-CO') : '-'}</td>
      </tr>`).join('');
  } catch {
    mostrarError('tablaHistorial', 5, 'Error al cargar historial');
  }
}
async function exportarHistorialCSV() {
  try {
    const res = await fetch('/api/historial');
    const data = await res.json();
    if (!data.length) return alert('No hay registros para exportar');

    const encabezado = ['ID', 'Acción', 'Descripción', 'Usuario', 'Fecha'];
    const filas = data.map(h => [
      h.id_historial,
      h.accion ?? '-',
      h.descripcion ?? '-',
      h.id_usuario ?? '-',
      h.fecha ? new Date(h.fecha).toLocaleDateString('es-CO') : '-'
    ]);

    const csv = [encabezado, ...filas].map(f => f.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historial.csv';
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    alert('Error al exportar el historial');
  }
}

//=======================
//CODIGOS
//=======================
async function cargarCodigos() {
  const tbody = document.getElementById('tablaCodigos');
  if (!tbody) return;
  try {
    const res = await fetch('/api/codigos');
    const data = await res.json();
    if (!data.length) return mostrarVacio('tablaCodigos', 6);
    tbody.innerHTML = data.map(c => `
      <tr>
        <td>${c.id_codigo}</td>
        <td>${c.codigo ?? '-'}</td>
        <td>${c.id_producto ?? '-'}</td>
        <td>${c.tipo ?? '-'}</td>
        <td>${c.fecha_registro ? new Date(c.fecha_registro).toLocaleDateString('es-CO') : '-'}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarCodigo(${c.id_codigo})">🗑️</button>
        </td>
      </tr>`).join('');
  } catch {
    mostrarError('tablaCodigos', 6, 'Error al cargar códigos');
  }
}

function nuevoCodigo() {
  document.getElementById('codigoId').value = '';
  document.getElementById('codProducto').value = '';
  document.getElementById('codTipo').value = 'barcode';
  document.getElementById('modalTituloCodigo').textContent = 'Generar Código';
  abrirModal('modalCodigo');
}

async function guardarCodigo() {
  const body = {
    id_producto: document.getElementById('codProducto').value,
    tipo: document.getElementById('codTipo').value,
    codigo: Math.random().toString(36).substring(2, 12).toUpperCase()
  };
  try {
    const res = await fetch('/api/codigos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error();
    cerrarModal('modalCodigo');
    window.location.reload();
  } catch {
    alert('Error al generar el código');
  }
}

async function eliminarCodigo(id) {
  if (!confirm('¿Eliminar este código?')) return;
  try {
    await fetch(`/api/codigos/${id}`, { method: 'DELETE' });
    window.location.reload();
  } catch {
    alert('Error al eliminar el código');
  }
}