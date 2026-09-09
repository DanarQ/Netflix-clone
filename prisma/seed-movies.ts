import { PrismaClient } from "@prisma/client";
import { movies } from "../src/data/movies";

const prisma = new PrismaClient();
try {
  await prisma.$transaction(movies.map(movie => prisma.movie.upsert({
    where: { id: movie.id }, update: movie, create: movie,
  })));
  console.log(`Updated ${movies.length} movies; profiles and accounts unchanged.`);
} finally {
  await prisma.$disconnect();
}
