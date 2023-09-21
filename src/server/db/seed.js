const client = require('./client');
const { createUser } = require('./users');

  
const dropTables = async () => {
  console.log('Dropping All Tables...');
    try {
        await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS orders;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        await client.query(`
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          address VARCHAR(255), 
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          "imgUrl" VARCHAR(255) DEFAULT 'https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg',
          "isAdmin" BOOLEAN DEFAULT false NOT NULL
        )`)

        await client.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          title VARCHAR(225) UNIQUE NOT NULL,
          artist VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          period VARCHAR(50),
          medium VARCHAR(50),
          price INTEGER NOT NULL,
          year INTEGER NOT NULL,
          dimensions VARCHAR(50) NOT NULL,
          "imgUrl" VARCHAR(255) DEFAULT 'https://png.pngtree.com/png-vector/20221025/ourmid/pngtree-art-gallery-museum-cartoon-illustration-with-exhibition-png-image_6363917.png'
        );`)

        await client.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          

        )
        `)
    }
    catch(err) {
        throw err;
    }
}

const usersToCreate = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];

const insertUsers = async () => {
  try {
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const productsToCreate = [
  {
    title: 'The Mona Lisa',
    artist: 'Leonardo da Vinci',
    description: 'Any list of Most Famous Paintings would be incomplete without the mention of the Mona Lisa by Leonardo da Vinci. This infamous portrait of Lisa del Giocondo was completed some time between 1503-1519 and currently on display at the Musee du Louvre in Paris.',
    period: 'Renaissance',
    medium: 'Oil paint',
    price: 860000000,
    year: 1503,
    dimensions: '77cm x 53cm',
    imgUrl: 'public/images/mona_lisa.jpeg',
  },
  {
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    description: 'Vincent van Gogh has painted countless well-known pieces; however, his painting Starry Night is widely considered to be his magnum opus. Painted in 1889, the piece was done from memory and whimsically depicts the view from his room at the sanitarium he resided in at the time.',
    period: 'Post-Impressionism, Modern art',
    medium: 'Oil paint',
    price: 100000000,
    year: 1889,
    dimensions: '73.7cm x 92.1cm',
    imgUrl: 'public/images/starry_night.jpeg',
  },
  {
    title: 'The Scream',
    artist: 'Edvard Munch',
    description: 'Using oil and pastel on cardboard, Edvard Munch painted his most famous piece, The Scream, circa 1893. Featuring a ghoulish figure that looks like the host from Tales from the Crypt, the backdrop of this expressionist painting is said to be Oslo, Norway.',
    period: 'Proto-Expressionism',
    medium: 'Oil paint',
    price: 119900000,
    year: 1893,
    dimensions: '91cm x 73.5cm',
    imgUrl: 'public/images/the_scream.jpeg',
  },
  {
    title: 'Guernica',
    artist: 'Pablo Picasso',
    description: 'Inspired by the bombing of Guernica, Spain, during the Spanish Civil War, Pablo Picasso completed this most famous piece, Guernica, in 1937. This piece was originally commissioned by the Spanish government and intended to depict the suffering of war and ultimately stand as symbol for peace.',
    period: 'Cubism, Surrealism',
    medium: 'Oil paint',
    price: 200000000,
    year: 1937,
    dimensions: '3.49m x 7.76m',
    imgUrl: 'public/images/guernica.jpeg',
  },
  {
    title: 'The Persistence of Memory',
    artist: 'Salvador Dali',
    description: "Painted in 1931 by yet another Spanish artist, Salvador Dali's The Persistance of Memory is one of the most recognizable and individual pieces in art history. Depicting a dismal shoreline draped with melting clocks, it is thought that Albert Einstein's Theory of Relativity inspired this bizarre piece.",
    period: 'Surrealism',
    medium: 'Oil paint, Bronze',
    price: 150000000,
    year: 1931,
    dimensions: '24cm x 33cm',
    imgUrl: 'public/images/the_persistence_of_memory.jpeg',
  },
  {
    title: 'Three Musicians',
    artist: 'Pablo Picasso',
    description: "At first glance it might look like a collage but Pablo Picasso's famous painting, Three Musicians is actually an oil painting. Completed in 1921, he painted two very similar paintings that are mutually referred to as Three Musicians and can be found in the New York MoMA and the Philadelphia Museum of Art.",
    period: 'Synthetic Cubism',
    medium: 'Oil on canvas',
    price: 1000000000,
    year: 1921,
    dimensions: '204.5cm x 188.3cm',
    imgUrl: 'public/images/three_musicians',
  },
  {
    title: 'A Sunday Afternoon on the Island of La Grande Jatte',
    artist: 'Georges Seurat',
    description: 'Using the unique technique of pointillism, creating a complete image that is made up of only distinct individual dots, the French painter Georges Seurat brings us his most famous piece A Sunday Afternoon on the Island of La Grande Jatte.',
    period: 'Pointillism',
    medium: 'Oil paint',
    price: 650000000,
    year: 1884,
    dimensions: '2m x 3m',
    imgUrl: 'public/images/a_sunday_afternoon.jpeg',
  },
  {
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    description: 'Considered by some to be the "Mona Lisa of the North," this enchanting painting by the Dutch artist, Johannes Vermeer, features exactly what the title infers - a Girl with a Peal Earring. Completed circa 1665, this piece can now be found in the Mauritshuis Gallery in the Hague.',
    period: 'Dutch Golden Age',
    medium: 'Oil paint',
    price: 100000000,
    year: 1665,
    dimensions: '	44.5cm x 39cm',
    imgUrl: 'public/images/girl_with_a_pearl_earring.jpeg',
  },
  {
    title: "Whistler's Mother",
    artist: 'James McNeill Whistler',
    description: "Whistler's Mother is the truncated name for James McNeill Whistler's very famous portrait originally known as Arrangement in Grey and Black: The Artist's Mother. Painted in 1871, it's one of the few American pieces on this list - although it is owned by a Parisian museum and therefore rarely seen in the states.",
    period: 'Realism',
    medium: 'Oil paint',
    price: 36000000,
    year: 1871,
    dimensions: '144.15cm x 162.56cm',
    imgUrl: 'public/images/whistlers_mother.jpeg',
  },
  {
    title: "Portrait de L'artiste Sans Barbe",
    artist: 'Vincent van Gogh',
    description: "Although the title isn't very creative, Vincent van Gogh's Self-Portrait without Beard is certainly one of the most notable paintings of all time. While Van Gogh has painted many portraits before, this is the most notable because it's one of the few that depicts him without a beard. Additionally, having sold for $71.5 million in 1998, it is one of the most expensive paintings ever sold.",
    period: 'Post-Impressionism',
    medium: 'Oil paint',
    price: 71500000,
    year: 1889,
    dimensions: '41cm x 32.6cm',
    imgUrl: 'public/images/self_portrait_without_beard.jpeg',
  },
  {
    title: 'The Night Watch',
    artist: 'Rembrandt',
    description: 'In its native Dutch tongue, De Nachtwacht is most popularly referred to in modern culture as The Night Watch. Using oil on canvas, Rembrandt (van Rijn) was commissioned by a militia captain and his 17 militia guards in 1642 to paint their company, in an effort to show off for the French Queen that would be visiting.',
    period: 'Baroque, Dutch Golden Age',
    medium: 'Oil paint',
    price: 500000000,
    year: 1642,
    dimensions: '3.6m x 4.4m',
    imgUrl: 'public/images/the_night_watch.jpeg',
  },
  {
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    description: "Easily touted as Gustav Klimt's most famous painting, The Kiss is a realistic yet geometric depiction of a kissing couple, completed in 1908 in Vienna, Austria. What makes this piece different than the other oil paintings on the list is that it also incorporates gold leaf on canvas (in addition to oils).",
    period: 'Art Nouveau',
    medium: 'Oil paint',
    price: 240000,
    year: 1907,
    dimensions: '99cm x 81cm',
    imgUrl: 'public/images/the_kiss.jpeg',
  },
  {
    title: 'Water Lilies',
    artist: 'Claude Monet',
    description: "French painter Claude Monet painted a series of 250 pieces known as Water Lilies between 1840 and 1926 - it's exactly what it sounds like, 250 paintings depicting a water lily pond from his backyard. While this might not be one individual painting, considering the collection is spread amongst the most renowned galleries of the world, the series is a deserving installment on this list",
    period: 'Impressionism',
    medium: 'Oil paint',
    price: 87000000,
    year: 1840,
    dimensions: '81cm x 100cm',
    imgUrl: 'public/images/water_lilies.jpeg',
  },
  {
    title: 'The Flower Carrier',
    artist: 'Diego Rivera',
    description: 'Known in its native tongue as "Cargador de Flores," The Flower Carrier was painted by Diego Rivera in 1935. Widely considered to be the greatest Mexican painter of the twentieth century, Rivera was known for his simple paintings dominated by their bright colors and The Flower Carrier is no exception.',
    period: 'Mexican Muralism',
    medium: 'Oil paint',
    price: 2000000,
    year: 1935,
    dimensions: '121.9cm x 121.3cm',
    imgUrl: 'public/images/the_flower_carrier',
  },
  {
    title: 'American Gothic',
    artist: 'Grant Wood',
    description: 'Marking the list as another iconic piece in American art, American Gothic, painted by Grant Wood in 1930 is a dry depiction of a farmer and his Plain-Jane daughter - The Great Depression personified.',
    period: 'Modernism, Regionalism',
    medium: 'Oil paint',
    price: 6000000,
    year: 1930,
    dimensions: '78cm x 65.3cm',
    imgUrl: 'public/images/american_gothic.jpeg',
  },
  {
    title: 'Cafe Terrace at Night',
    artist: 'Vincent van Gogh',
    description: 'Never one for flashy titles, Cafe Terrace at Night (1888) by the ever-prolific Vincent Van Gogh, is one of the most individual depictions of such a mundane setting. Though Van Gogh never signed this piece, he references his famous Cafe masterpiece in many personal documents.',
    period: 'Post-Impressionism, Cloisonnism',
    medium: 'Oil paint',
    price: 200000000,
    year: 1888,
    dimensions: '80.7cm x 65.3cm',
    imgUrl: 'public/images/cafe_terrace_at_night.jpeg',
  },
  {
    title: 'The Son of Man',
    artist: 'Rene Magrittees',
    description: 'The most current piece of all on this list, painted in 1964, is Rene Magrittees The Son of Man. Although it is a self-portrait, his face is largely covered by a floating green apple and contributes to his series of paintings known as the The Great War on Facades.',
    period: 'Surrealism',
    medium: 'Oil paint',
    price: 80000000,
    year: 1964,
    dimensions: '116cm x 89cm',
    imgUrl: 'public/images/the_son_of_man.jpeg',
  },
  {
    title: 'No. 5, 1948',
    artist: 'Jackson Pollock',
    description: 'Another of the more current pieces, painted by Jackson Pollock in 1948, the impersonally titled No. 5, 1948, though chaotic, is a signature piece of art nonetheless and a revealing insight to the turmoil that was swirling within Pollock.',
    period: 'Abstract expressionism',
    medium: 'Fiberboard',
    price: 140000000,
    year: 1948,
    dimensions: '2.4m x 1.2m',
    imgUrl: 'public/images/no_5.jpeg',
  },
  {
    title: 'Bal du moulin de la Galette',
    artist: 'Pierre-Auguste Renoires',
    description: 'While the imagery in this painting might not be the most immediately recognizable, having sold for $78.1 million (adjusted price of $127.4 million), French artist Pierre-Auguste Renoires Bal du Moulin de la Galette is one of the most expensive paintings of all time and therefore, one of the most famous.',
    period: 'Impressionism, Modern art',
    medium: 'Oil paint',
    price: 80000000,
    year: 1876,
    dimensions: '131cm x 175cm',
    imgUrl: 'public/images/bal_du_moulin_de_la_galette.jpeg',
  },
  {
    title: 'Dogs Playing Poker',
    artist: 'Cassius Marcellus Coolidge.',
    description: 'Commissioned by Brown & Begelow Cigars in 1903, American painter C.M. Coolidge painted 16 unforgettable images of Dogs Playing Poker for the brand. Spoofed many times in greeting cards and in popular culture, this series of dogs playing cards around a table is widely recognizable and truly iconic.',
    period: 'kitsch art',
    medium: 'Oil paint',
    price: 658000,
    year: 1903,
    dimensions: '60cm x 80cm',
    imgUrl: 'public/images/dogs_playing_poker.jpeg',
  },
]

const seedDatabse = async () => {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await insertUsers();
    }
    catch (err) {
        throw err;
    }
    finally {
        client.end()
    }
}

seedDatabse()
