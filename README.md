# 📦 StockLogistic
### Sistema de Gestión de Inventario

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

## 📋 Descripción

**StockLogistic** es un módulo de software desarrollado para la **gestión integral de inventarios**. Permite controlar entradas, salidas, transferencias y trazabilidad de productos mediante una interfaz intuitiva, acceso multiusuario con roles y soporte en la nube.

Proyecto desarrollado como evidencia de formación en el programa de **Análisis y Desarrollo de Software – SENA**.

---

## 🚀 Funcionalidades Principales

- ✅ Gestión de inventarios con datos completos (nombre, categoría, ubicación, código de barras)
- ✅ Control de movimientos: entradas, salidas y transferencias
- ✅ Alertas automáticas configurables por niveles de stock
- ✅ Reportes personalizados sobre consumo y rotación
- ✅ Gestión de proveedores y pedidos
- ✅ Integración con lectores de códigos de barras y QR
- ✅ Integración con contabilidad, CRM o ventas (A futuro)

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Backend / lógica del servidor |
| JavaScript | Lenguaje principal |
| MySQL | Base de datos relacional |
| MySQL Workbench | Gestión visual de la base de datos |
| Git / GitHub | Control de versiones |

---

## ⚙️ Requisitos Previos

Antes de ejecutar el proyecto se debe tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [MySQL](https://www.mysql.com/) / MySQL Workbench
- Git

---

## 📥 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tatiana1035-source/Dise-o-y-desarrollo-de-servicios-web---proyecto.git
cd stocklogistic
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

- Abre **MySQL Workbench**
- Crea una base de datos llamada `stocklogistic2`
- Importa el archivo `database/stocklogistic2.sql` que está en el repositorio

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con los siguientes datos:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=stocklogistic
PORT=3000
```

### 5. Ejecutar el proyecto

```bash
npm start
```

El sistema estará disponible en: `http://localhost:3000`

---

## 🧪 Ejecutar Tests

El proyecto cuenta con tests unitarios por módulo:

```bash
npm test
```

---

## 📁 Estructura del Proyecto

```
stocklogistic/
├── src/
│   ├── modules/
│   │   ├── inventario/
│   │   ├── movimientos/
│   │   ├── alertas/
│   │   ├── reportes/
│   │   └── proveedores/
│   ├── config/
│   └── app.js
├── test/
│   ├── inventario.test.js
│   ├── movimientos.test.js
│   ├── alertas.test.js
│   ├── reportes.test.js
│   └── proveedores.test.js
├── database/
│   └── stocklogistic.sql
├── .env.example
├── package.json
└── README.md
```

---

## 👤 Autor

**Nombre:** Yuli Tatiana Moreno Vásquez
**Programa:** Análisis y Desarrollo de Software  
**Institución:** SENA  
**Año:** 2025  

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para el **Servicio Nacional de Aprendizaje – SENA**.
