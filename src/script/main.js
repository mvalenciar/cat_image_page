const randomSection = document.querySelector(
  '#random_kitty .container-md .row',
);
const btn_reload = document.querySelector('#reloadBtn');
const favouriteSection = document.querySelector(
  '#favourite .container-md .row',
);

const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key':
      'live_Lkt7Pbscmp8mQmXIrkquO64xTHtNRoxCX0JMWZaRqxPmL1OqYK8N3gdYOJumOmvm',
  },
});

const randomKitty = async () => {
  try {
    const res = await api.get('/images/search', {
      params: {
        limit: 9,
      },
    });

    res.data.forEach((kitty) => {
      const col = document.createElement('div');
      col.classList.add('col-lg-4', 'p-2', 'd-flex', 'justify-content-center');
      const fig = document.createElement('figure');
      fig.classList.add('figure');
      const img = document.createElement('img');
      img.classList.add('figure-img', 'img-fluid', 'rounded', 'shadow-sm');
      img.src = kitty.url;
      const figcaption = document.createElement('figcaption');
      figcaption.classList.add('figure-caption');
      const btn = document.createElement('button');
      btn.classList.add('btn', 'btn-sm', 'btn-primary', 'shadow-sm');
      const btnText = document.createTextNode('+ Add Favorite');
      btn.addEventListener('click', () => saveFavorite(kitty.id));

      btn.appendChild(btnText);
      figcaption.appendChild(btn);
      fig.appendChild(img);
      fig.appendChild(figcaption);
      col.appendChild(fig);
      randomSection.appendChild(col);
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteFavorite = async (favourite_id) => {
  console.log('hola delete');
  const res = await api.delete(`favourites/${favourite_id}`);
  console.log('img delete');
};

const loadFavorite = async () => {
  try {
    const res = await api.get('/favourites');
    console.log('favourite', res);
    const favouriteKitties = res.data.map((favourite) => {
      const col = document.createElement('div');
      col.classList.add('col-lg-4', 'p-2', 'd-flex', 'justify-content-center');
      const fig = document.createElement('figure');
      fig.classList.add('figure');
      const img = document.createElement('img');
      img.classList.add('figure-img', 'img-fluid', 'rounded', 'shadow-sm');
      img.src = favourite.image.url;
      const figcaption = document.createElement('figcaption');
      figcaption.classList.add('figure-caption');
      const btn = document.createElement('button');
      btn.classList.add('btn', 'btn-sm', 'btn-danger', 'shadow-sm');
      const btnText = document.createTextNode('- Rm Favorite');
      btn.addEventListener('click', () => deleteFavorite(favourite.id));

      btn.appendChild(btnText);
      figcaption.appendChild(btn);
      fig.appendChild(img);
      fig.appendChild(figcaption);
      col.appendChild(fig);
      favouriteSection.appendChild(col);
    });
  } catch (error) {
    console.error(error);
  }
};

const saveFavorite = async (id) => {
  try {
    const res = await api.post('/favourites', {
      image_id: id,
    });

    console.log('res id', res.data.id);

    const loadKittyImg = await api.get(`favourites/${res.data.id}`);

    console.log('loadKittyImg', loadKittyImg.data.image.url);
    const col = document.createElement('div');
    col.classList.add('col-lg-4', 'p-2', 'd-flex', 'justify-content-center');
    const fig = document.createElement('figure');
    fig.classList.add('figure');
    const img = document.createElement('img');
    img.classList.add('figure-img', 'img-fluid', 'rounded', 'shadow-sm');
    img.src = loadKittyImg.data.image.url;
    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('figure-caption');
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-sm', 'btn-danger', 'shadow-sm');
    const btnText = document.createTextNode('- Rm Favorite');
    btn.addEventListener('click', () => deleteFavorite(res.data.id));

    btn.appendChild(btnText);
    figcaption.appendChild(btn);
    fig.appendChild(img);
    fig.appendChild(figcaption);
    col.appendChild(fig);
    favouriteSection.appendChild(col);
  } catch (error) {
    console.error(error);
  }
};

btn_reload.addEventListener('click', () => {
  randomKitty();
});

randomKitty();
loadFavorite();
