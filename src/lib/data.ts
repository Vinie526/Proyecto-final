import type { MenuItem, LunchCategory } from './types';

export const restaurantInfo = {
  name: 'Mana Coffee',
  offerings: 'Desayunos, almuerzos, comidas rápidas, cenas, y comidas de noche.',
  hours: 'Lunes a Domingo: 6:00 am – 7:00 pm / 9:00 pm (según día).',
  events: 'Organizamos eventos especiales como cumpleaños y cenas de grado.',
  history: 'Fundado el 29 de enero de 2024, nuestro restaurante familiar lleva más de 11 meses sirviendo a la comunidad con pasión.',
  competitions: 'Hemos participado en 2 concursos de hamburguesas, vendiendo más de 1300 en total.',
  profile: 'Un restaurante familiar con un ambiente acogedor para todos.',
  capacity: 'Tenemos una capacidad para 35 a 40 personas.',
  partners: 'Trabajamos con aliados estratégicos como Bimbo y un chef especializado para garantizar la mejor calidad.',
  delivery: {
    available: true,
    drivers: 'Contamos con 1 o 2 domiciliarios dedicados.',
    cost: 'El costo del domicilio varía entre $5.000 y $7.000 COP, dependiendo del lugar y la hora.',
  },
  location: {
    address: 'Pamplona, Norte de Santander',
    note: 'Estamos ubicados justo frente al Hospital San Juan de Dios de Pamplona.',
  },
  socials: {
    instagram: 'https://www.instagram.com/mana_coffee_pam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    facebook: 'https://www.facebook.com/share/17cRvePN9j/',
  },
  whatsappNumber: '573150118386',
  payments: ['Nequi', 'Daviplata', 'Bancolombia'],
};

export const menuItems: MenuItem[] = [
  // Platos Fijos
  { name: 'Pollo Gordon Blue', description: 'Pechuga de pollo rellena de jamón y queso, apanada y frita.', price: 25000, category: 'Platos a la Carta', image: 'gordon-bleu' },
  { name: 'Pasta a la Boloñesa', description: 'Pasta tradicional con nuestra salsa boloñesa casera.', price: 22000, category: 'Platos a la Carta', image: 'pasta' },
  { name: 'Salmón a la Plancha', description: 'Filete de salmón fresco cocinado a la plancha con finas hierbas.', price: 35000, category: 'Platos a la Carta', image: 'salmon' },
  { name: 'Punta de Anca', description: 'Corte de res premium a la parrilla, tierno y jugoso.', price: 30000, category: 'Platos a la Carta', image: 'gallery-1' },
  
  // Desayunos
  { name: 'Calentao', description: 'Tradicional calentao con huevo, arepa y bebida caliente.', price: 15000, category: 'Desayunos', image: 'breakfast' },
  { name: 'Desayuno Americano', description: 'Huevos, tocineta, pancakes y jugo de naranja.', price: 18000, category: 'Desayunos', image: 'breakfast' },
  
  // Comidas Rápidas
  { name: 'Hamburguesa Mana', description: 'Nuestra hamburguesa especial, ganadora de concursos.', price: 20000, category: 'Comidas Rápidas', image: 'gallery-1' },
  { name: 'Perro Caliente Especial', description: 'Salchicha americana, queso, tocineta y salsas de la casa.', price: 16000, category: 'Comidas Rápidas', image: 'gallery-2' },

  // Vegetariano
  { name: 'Lasaña de Vegetales', description: 'Capas de pasta con vegetales de temporada y salsa bechamel.', price: 23000, category: 'Menú Vegetariano', image: 'gallery-3' },
  { name: 'Hamburguesa de Lentejas', description: 'Deliciosa hamburguesa a base de lentejas con pan artesanal.', price: 19000, category: 'Menú Vegetariano', image: 'gallery-3' },

  // Domingo
  { name: 'Plato Especial del Domingo', description: 'Cada domingo un plato diferente para sorprenderte.', price: 28000, category: 'Domingos', image: 'sunday-special' },
];

export const buildYourLunchData: { basePrice: number, containerPrice: number, categories: LunchCategory[] } = {
  basePrice: 0, // El precio base ahora es 0, los ejecutivos tienen su propio precio.
  containerPrice: 1000,
  categories: [
    {
      id: 'especial',
      name: 'Especial del Día',
      limit: 1,
      options: [
        { id: 'esp1', name: 'Pollo a la Cazadora', price: 20000 },
      ],
    },
    {
      id: 'ejecutivos',
      name: 'Ejecutivos',
      limit: 1,
      options: [
        { id: 'eje1', name: 'Pechuga Asada', price: 15000 },
        { id: 'eje2', name: 'Carne Asada', price: 15000 },
        { id: 'eje3', name: 'Cerdo Asado', price: 15000 },
        { id: 'eje4', name: 'Hígado Encebollado', price: 15000 },
      ],
    },
    {
      id: 'acompanamientos',
      name: 'Acompañado de',
      limit: 4, // El usuario puede escoger varios
      options: [
        { id: 'aco1', name: 'Sopa de Arrocillo', price: 0 },
        { id: 'aco2', name: 'Salteado de Vegetales', price: 0 },
        { id: 'aco3', name: 'Papa Rustica', price: 0 },
        { id: 'aco4', name: 'Arroz', price: 0 },
      ],
    },
    {
      id: 'adicionales',
      name: 'Adicionales (Construye tu almuerzo)',
      limit: 15, // Límite alto para permitir múltiples selecciones
      options: [
        { id: 'ad1', name: 'Arroz', price: 4000 },
        { id: 'ad2', name: 'Papas a la Francesa', price: 5200 },
        { id: 'ad3', name: 'Carnes (Res, Cerdo o Pechuga)', price: 8900 },
        { id: 'ad4', name: 'Sopa de día', price: 5000 },
        { id: 'ad5', name: 'Ensalada del día', price: 3200 },
        { id: 'ad6', name: 'Tajadas de Maduro', price: 3000 },
        { id: 'ad7', name: 'Maiz', price: 3000 },
        { id: 'ad8', name: 'Tocineta', price: 5000 },
        { id: 'ad9', name: 'Huevo', price: 3000 },
        { id: 'ad10', name: 'Queso', price: 3500 },
        { id: 'ad11', name: 'Chorizo', price: 4000 },
        { id: 'ad12', name: 'Salchicha', price: 3000 },
        { id: 'ad13', name: 'Granos del día', price: 4000 },
        { id: 'ad14', name: 'Patacones', price: 6500 },
        { id: 'ad15', name: 'Papas locas', price: 9900 },
      ],
    },
  ],
};
