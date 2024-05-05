const users = [
  {
    first_name: "Brandise",
    last_name: "Ingerman",
    email: "bingerman0@youku.com",
    gender: "Female",
    address: {
      city: "Fresno",
      state: "California",
      country: "United States",
      country_code: "US",
    },
    card: {
      card_number: "3571237735836521",
      card_type: "jcb",
      currency_code: "USD",
      balance: "$630.16",
    },
    married_status: true,
  },
  {
    first_name: "Nevil",
    last_name: "Southwell",
    email: "nsouthwell1@ow.ly",
    gender: "Male",
    address: {
      city: "Brooklyn",
      state: "New York",
      country: "United States",
      country_code: "US",
    },
    card: {
      card_number: "4041593851397",
      card_type: "visa",
      currency_code: "USD",
      balance: "$7114.48",
    },
    married_status: false,
  },
  {
    first_name: "Pearla",
    last_name: "Gullan",
    email: "pgullan2@yandex.ru",
    gender: "Female",
    address: {
      city: "Salt Lake City",
      state: "Utah",
      country: "United States",
      country_code: "US",
    },
    card: {
      card_number: "676296646716051370",
      card_type: "maestro",
      currency_code: "USD",
      balance: "$3256.41",
    },
    married_status: false,
  },
  {
    first_name: "Brigg",
    last_name: "Okell",
    email: "bokell3@nsw.gov.au",
    gender: "Male",
    address: {
      city: "Austin",
      state: "Texas",
      country: "United States",
      country_code: "US",
    },
    card: {
      card_number: "5577978480660710",
      card_type: "diners-club-us-ca",
      currency_code: "USD",
      balance: "$6062.56",
    },
    married_status: true,
  },
];

db = db.getSiblingDB("mydatabase");
db.usersCollection.insertMany(users);
