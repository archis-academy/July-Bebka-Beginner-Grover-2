const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3NTQxNS4yMjg3MjYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8DRNkOvTb4LktLJmLOU812inEcl9rlWgtDcpCpDHEL0'
  }
};

// TMDb API'den trend olan filmleri çeken fonksiyon
async function fetchTrendingMovies() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
    const data = await response.json();
    
    // İkinci filmi seçiyoruz
    const secondMovie = data.results[1]; // İkinci filmi seçiyoruz
    const movieId = secondMovie.id; // Dinamik olarak film ID'sini alıyoruz

    // İkinci kartın verilerini güncelle
    document.querySelector('.second-movie img').src = `https://image.tmdb.org/t/p/w500${secondMovie.backdrop_path}`;
    document.querySelector('.second-movie .text').textContent = secondMovie.title;

    // Fragmanı çek ve modal ile göster
    const trailerUrl = await fetchTrailer(movieId); // movieId'yi kullanarak fragmanı dinamik çekiyoruz
    document.getElementById('play-trailer').addEventListener('click', function () {
      if (trailerUrl) {
        document.getElementById('trailer-video').src = trailerUrl;
        document.getElementById('trailer-modal').style.display = 'block';
      } else {
        alert('Trailer not available');
      }
    });

  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
}

// Fragmanı TMDb API'den çeken fonksiyon
async function fetchTrailer(movieId) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);
  const data = await response.json();
  
  const trailer = data.results.find(video => video.type === "Trailer");
  if (trailer) {
    return `https://www.youtube.com/embed/${trailer.key}`;
  }
  return null;
}

// Modalı kapatma
document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('trailer-modal').style.display = 'none';
  document.getElementById('trailer-video').src = ''; // Videoyu durdur
});

// Filmleri çekerken fonksiyonu başlat
fetchTrendingMovies();