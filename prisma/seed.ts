import { PrismaClient } from "@prisma/client";
import { helpTopics } from "../src/data/helpTopics.ts";
import { movies } from "../src/data/movies.ts";
import { defaultProfiles } from "../src/data/profiles.ts";

const prisma = new PrismaClient();

async function main() {
  console.log("Mulai seeding database SQLite...");

  for (const movie of movies) {
    await prisma.movie.upsert({ where: { id: movie.id }, update: movie, create: movie });
  }
  console.log(`Berhasil seed ${movies.length} judul film.`);

  for (const profile of defaultProfiles) {
    const data = { id: profile.id, name: profile.name, color: profile.color, isKids: Boolean(profile.isKids) };
    await prisma.profile.upsert({ where: { id: profile.id }, update: data, create: data });
  }
  console.log(`Berhasil seed ${defaultProfiles.length} profil default.`);

  for (const [topicIndex, topic] of helpTopics.entries()) {
    const topicId = `help-topic-${topicIndex + 1}`;
    await prisma.helpTopic.upsert({
      where: { id: topicId },
      update: { title: topic.title, icon: topic.icon, position: topicIndex },
      create: { id: topicId, title: topic.title, icon: topic.icon, position: topicIndex },
    });

    for (const [articleIndex, article] of topic.articles.entries()) {
      const articleId = `${topicId}-article-${articleIndex + 1}`;
      const data = { ...article, topicId, position: articleIndex };
      await prisma.helpArticle.upsert({
        where: { id: articleId },
        update: data,
        create: { id: articleId, ...data },
      });
    }
  }
  console.log(`Berhasil seed ${helpTopics.length} topik bantuan.`);

  await prisma.membership.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", plan: "Standard", cancelled: false },
  });

  const passwordHash = await Bun.password.hash("123456", { algorithm: "bcrypt", cost: 10 });
  await prisma.account.upsert({
    where: { username: "danarq" },
    update: { passwordHash },
    create: { username: "danarq", passwordHash },
  });
  console.log("Berhasil seed membership dan akun danarq.");
  console.log("Seeding database SQLite selesai.");
}

main()
  .catch((error) => {
    console.error("Gagal saat seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
