export type Movie = { id: string; name: string; genre: string; type: "Series" | "Film"; image: string; description: string };
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
export const movies: Movie[] = [
  { id: "wild", name: "THE LAST FRONTIER", genre: "Adventure", type: "Series", image: photo("photo-1464822759023-fed622ff2c3b"), description: "Di ujung dunia yang belum terjamah, seorang penjelajah mencari jejak ekspedisi yang hilang. Setiap langkah membawanya lebih dekat pada rahasia di balik pegunungan." },
  { id: "city", name: "AFTER HOURS", genre: "Thriller", type: "Series", image: photo("photo-1519608487953-e999c86e7455"), description: "Satu panggilan tengah malam mempertemukan tiga orang asing. Sebelum matahari terbit, mereka harus mengungkap siapa yang mengawasi kota." },
  { id: "ocean", name: "DEEP BLUE", genre: "Documentary", type: "Film", image: photo("photo-1518837695005-2083093ee35b"), description: "Perjalanan menyusuri lautan, kehidupan di bawah permukaan, dan orang-orang yang menjadikan ombak sebagai rumah." },
  { id: "forest", name: "INTO THE PINES", genre: "Mystery", type: "Series", image: photo("photo-1448375240586-882707db888b"), description: "Kepulangan seorang fotografer membuka kembali misteri yang selama ini terkubur di hutan pinus." },
  { id: "road", name: "NOWHERE BOUND", genre: "Drama", type: "Film", image: photo("photo-1500534623283-312aade485b7"), description: "Dua sahabat meninggalkan rutinitas untuk sebuah perjalanan tanpa tujuan. Di sepanjang jalan, mereka menemukan alasan untuk memulai kembali." },
  { id: "summit", name: "ABOVE IT ALL", genre: "Adventure", type: "Film", image: photo("photo-1454496522488-7a8e488e8606"), description: "Seorang pendaki muda menghadapi perjalanan terbesarnya. Untuk mencapai puncak, ia harus belajar mempercayai timnya." },
];
