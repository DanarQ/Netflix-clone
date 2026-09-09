export type Movie = { id: string; name: string; genre: string; type: "Series" | "Film"; image: string; video: string; description: string };
// Sources: docs/movie-sources.md. Keep IDs stable when editing.
export const movies: Movie[] = [
  {
    "id": "interstellar",
    "name": "INTERSTELLAR",
    "genre": "Science Fiction",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/zSWdZVtXT7E/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    "description": "Ketika Bumi semakin sulit dihuni, mantan pilot Cooper meninggalkan keluarganya untuk memimpin ekspedisi antargalaksi. Bersama tim penjelajah, ia mencari tempat baru bagi umat manusia di antara bintang-bintang."
  },
  {
    "id": "dune-part-two",
    "name": "DUNE: PART TWO",
    "genre": "Science Fiction",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/Way9Dexny3w/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=Way9Dexny3w",
    "description": "Paul Atreides bergabung dengan Chani dan bangsa Fremen untuk melawan pihak yang menghancurkan keluarganya. Ia menghadapi pilihan antara cinta dan masa depan semesta yang dibayangi penglihatannya."
  },
  {
    "id": "the-wild-robot",
    "name": "THE WILD ROBOT",
    "genre": "Animation",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/JJudcOeSl-k/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=JJudcOeSl-k",
    "description": "Robot Roz terdampar di pulau liar dan belajar beradaptasi dengan alam serta hewan-hewan penghuninya. Hubungannya dengan seekor anak angsa membawanya memahami arti kepedulian, keluarga, dan hidup bersama."
  },
  {
    "id": "one-piece",
    "name": "ONE PIECE",
    "genre": "Adventure",
    "type": "Series",
    "image": "https://i.ytimg.com/vi/S-XxKVxZ2fU/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=S-XxKVxZ2fU",
    "description": "Luffy dan kru Topi Jerami berlayar menuju Grand Line. Pulau-pulau aneh, musuh baru, dan impian besar menguji persahabatan mereka."
  },
  {
    "id": "squid-game",
    "name": "SQUID GAME",
    "genre": "Thriller",
    "type": "Series",
    "image": "https://i.ytimg.com/vi/zgGTVaG2UiQ/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=zgGTVaG2UiQ",
    "description": "Para peserta yang terdesak utang mempertaruhkan hidup dalam permainan berhadiah besar. Di balik aturan sederhana, tersimpan pilihan yang menguji kemanusiaan."
  },
  {
    "id": "arcane",
    "name": "ARCANE",
    "genre": "Fantasy",
    "type": "Series",
    "image": "https://i.ytimg.com/vi/4Ps6nV4wiCE/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=4Ps6nV4wiCE",
    "description": "Dua saudari berada di sisi berbeda dalam konflik antara kota makmur Piltover dan wilayah bawah tanah Zaun. Penemuan teknologi baru mengubah keseimbangan kekuasaan."
  },
  {
    "id": "wednesday",
    "name": "WEDNESDAY",
    "genre": "Mystery",
    "type": "Series",
    "image": "https://i.ytimg.com/vi/Di310WS8zLk/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=Di310WS8zLk",
    "description": "Wednesday Addams memasuki Nevermore Academy dan menyelidiki misteri supernatural. Kemampuan psikis serta hubungan barunya membuat kehidupan sekolah jauh dari biasa."
  },
  {
    "id": "the-witcher",
    "name": "THE WITCHER",
    "genre": "Fantasy",
    "type": "Series",
    "image": "https://i.ytimg.com/vi/ndl1W4ltcmg/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=ndl1W4ltcmg",
    "description": "Geralt dari Rivia mencari tempatnya di dunia sebagai pemburu monster. Takdir mempertemukannya dengan seorang penyihir dan putri muda yang membawa rahasia besar."
  },
  {
    "id": "our-planet",
    "name": "OUR PLANET",
    "genre": "Documentary",
    "type": "Series",
    "image": "https://i.ytimg.com/vi/aETNYyrqNYE/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=aETNYyrqNYE",
    "description": "Jelajahi habitat menakjubkan dan kehidupan liar dari berbagai penjuru Bumi. Dokumenter ini memperlihatkan hubungan alam yang rapuh dan pentingnya menjaga masa depannya."
  },
  {
    "id": "inside-out-2",
    "name": "INSIDE OUT 2",
    "genre": "Animation",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/LEjhY15eCx0/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=LEjhY15eCx0",
    "description": "Riley memasuki masa remaja dan pusat kendali emosinya kedatangan penghuni baru. Joy dan teman-temannya harus beradaptasi ketika Anxiety mulai mengambil alih."
  },
  {
    "id": "oppenheimer",
    "name": "OPPENHEIMER",
    "genre": "Drama",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/bK6ldnjE3Y0/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=bK6ldnjE3Y0",
    "description": "Fisikawan J. Robert Oppenheimer memimpin pengembangan bom atom dalam Proyek Manhattan. Pencapaian ilmiahnya membawa konsekuensi moral dan politik yang terus membayanginya."
  },
  {
    "id": "jurassic-world-rebirth",
    "name": "JURASSIC WORLD REBIRTH",
    "genre": "Adventure",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/jan5CFWs9ic/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=jan5CFWs9ic",
    "description": "Sebuah tim menjalankan misi berbahaya untuk memperoleh sampel biologis dinosaurus. Ekspedisi membawa mereka ke wilayah terpencil dengan ancaman yang tak terduga."
  },
  {
    "id": "puss-in-boots-the-last-wish",
    "name": "PUSS IN BOOTS: THE LAST WISH",
    "genre": "Animation",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/xgZLXyqbYOc/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=xgZLXyqbYOc",
    "description": "Setelah menghabiskan hampir seluruh nyawanya, Puss in Boots mencari bintang pengabul permintaan. Perjalanan bersama sekutu baru memaksanya meninjau kembali arti keberanian."
  },
  {
    "id": "kung-fu-panda-4",
    "name": "KUNG FU PANDA 4",
    "genre": "Animation",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/_inKs4eeHiI/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=_inKs4eeHiI",
    "description": "Po bersiap menjadi pemimpin spiritual dan mencari penerus sebagai Dragon Warrior. Namun seorang penyihir pengubah wujud mengancam kedamaian yang ia lindungi."
  },
  {
    "id": "how-to-train-your-dragon-the-hidden-world",
    "name": "HOW TO TRAIN YOUR DRAGON: THE HIDDEN WORLD",
    "genre": "Animation",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/SkcucKDrbOI/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=SkcucKDrbOI",
    "description": "Hiccup berusaha membangun rumah yang aman bagi manusia dan naga. Kemunculan naga misterius membawa Toothless menuju dunia baru, sementara ancaman pemburu semakin dekat."
  },
  {
    "id": "the-super-mario-bros-movie",
    "name": "THE SUPER MARIO BROS. MOVIE",
    "genre": "Animation",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/TnGl01FkMMo/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=TnGl01FkMMo",
    "description": "Mario terlempar ke Kerajaan Jamur dan bekerja sama dengan Princess Peach serta Toad. Ia harus menemukan Luigi dan menghadapi ambisi Bowser."
  },
  {
    "id": "abominable",
    "name": "ABOMINABLE",
    "genre": "Animation",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/Ap0NRJD-2ts/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=Ap0NRJD-2ts",
    "description": "Seorang remaja menemukan yeti di atap apartemennya. Bersama teman-temannya, ia memulai perjalanan mengembalikan makhluk ajaib itu ke pegunungan Himalaya."
  },
  {
    "id": "the-fall-guy",
    "name": "THE FALL GUY",
    "genre": "Action",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/j7jPnwVGdZ8/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=j7jPnwVGdZ8",
    "description": "Seorang pemeran pengganti kembali bekerja setelah kecelakaan berat. Saat bintang film menghilang, ia terseret konspirasi sambil berusaha memperbaiki hubungan dengan sang sutradara."
  },
  {
    "id": "1917",
    "name": "1917",
    "genre": "Drama",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/gZjQROMAh_s/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=gZjQROMAh_s",
    "description": "Dua prajurit Inggris harus melintasi wilayah musuh untuk menyampaikan pesan mendesak. Waktu terus menipis dalam misi yang dapat menyelamatkan banyak nyawa."
  },
  {
    "id": "the-bad-guys",
    "name": "THE BAD GUYS",
    "genre": "Animation",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/zpDuBXB_glk/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=zpDuBXB_glk",
    "description": "Sekelompok penjahat hewan mencoba meyakinkan dunia bahwa mereka dapat berubah. Rencana berpura-pura menjadi baik mulai menggoyahkan persahabatan dan kebiasaan lama mereka."
  },
  {
    "id": "nope",
    "name": "NOPE",
    "genre": "Horror",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/In8fuzj3gck/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=In8fuzj3gck",
    "description": "Dua saudara yang mengelola peternakan kuda menyaksikan fenomena aneh di langit California. Upaya merekam bukti membawa mereka menghadapi bahaya yang sulit dipahami."
  },
  {
    "id": "twisters",
    "name": "TWISTERS",
    "genre": "Action",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/wdok0rZdmx4/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=wdok0rZdmx4",
    "description": "Seorang peneliti badai kembali ke lapangan dan bertemu pemburu tornado yang gemar mengambil risiko. Keduanya menghadapi cuaca ekstrem yang mengancam komunitas di sekitar mereka."
  },
  {
    "id": "fast-x",
    "name": "FAST X",
    "genre": "Action",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/aOb15GVFZxU/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=aOb15GVFZxU",
    "description": "Dom Toretto dan keluarganya menjadi sasaran musuh yang merencanakan balas dendam bertahun-tahun. Ancaman dari masa lalu memaksa mereka bertarung di berbagai penjuru dunia."
  },
  {
    "id": "m3gan",
    "name": "M3GAN",
    "genre": "Horror",
    "type": "Film",
    "image": "https://i.ytimg.com/vi/BRb4U99OU80/hqdefault.jpg",
    "video": "https://www.youtube.com/watch?v=BRb4U99OU80",
    "description": "Seorang ahli robotika menciptakan boneka kecerdasan buatan untuk menemani keponakannya. Keinginan sang boneka untuk melindungi perlahan berubah menjadi ancaman."
  }
];
