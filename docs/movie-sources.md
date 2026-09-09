# Movie catalog

Curated on 2026-09-09. Descriptions are short Indonesian paraphrases. Images are YouTube trailer thumbnails, not theatrical posters. Playback is a trailer, not the full movie.

| Film | Synopsis source | Trailer |
| --- | --- | --- |
| Interstellar | https://www.paramountpictures.com/movies/interstellar | https://www.youtube.com/watch?v=zSWdZVtXT7E |
| Dune: Part Two | https://www.legendary.com/film/dune-part-two/ | https://www.youtube.com/watch?v=Way9Dexny3w |
| The Wild Robot | https://www.youtube.com/watch?v=JJudcOeSl-k | https://www.youtube.com/watch?v=JJudcOeSl-k |

Edit `src/data/movies.ts`, then run `bun run db:seed:movies` to upsert the catalog into SQLite without resetting profiles, accounts, or memberships. Keep each film's ID stable. Old demo rows remain in the database to preserve existing relations; they are no longer in the client catalog.

The UI still imports the static catalog. Editing SQLite alone does not update the UI. No schema migration or YouTube API key is needed: `Movie.video` stores the watch URL. YouTube uses its own embedded controls in both players, with an external link on the watch/detail screens. The YouTube player stays mounted outside Routes in App; full/mini transitions resize the same iframe without restarting playback. Embedding and availability can vary by uploader, region, and browser.

## Expanded catalog (2026-09-09)

24 unique titles: 18 films and 6 series. Series descriptions cover the series premise; trailer season/teaser is identified below. Descriptions are editorial Indonesian summaries, not copied marketing text. Universal trailer IDs were found in indexed official /videos pages; some of those pages now redirect to the theme park site. Direct YouTube links are retained. Individual embed playback has not been verified for every title.

| Title | Trailer source | Edition |
| --- | --- | --- |
| ONE PIECE | https://www.youtube.com/watch?v=S-XxKVxZ2fU | Season 2 trailer |
| SQUID GAME | https://www.youtube.com/watch?v=zgGTVaG2UiQ | Season 3 trailer |
| ARCANE | https://www.youtube.com/watch?v=4Ps6nV4wiCE | Official trailer |
| WEDNESDAY | https://www.youtube.com/watch?v=Di310WS8zLk | Official teaser |
| THE WITCHER | https://www.youtube.com/watch?v=ndl1W4ltcmg | Main trailer |
| OUR PLANET | https://www.youtube.com/watch?v=aETNYyrqNYE | Official trailer |
| INSIDE OUT 2 | https://www.youtube.com/watch?v=LEjhY15eCx0 | Official trailer |
| OPPENHEIMER | https://www.youtube.com/watch?v=bK6ldnjE3Y0 | Official trailer |
| JURASSIC WORLD REBIRTH | https://www.youtube.com/watch?v=jan5CFWs9ic | Official trailer |
| PUSS IN BOOTS: THE LAST WISH | https://www.youtube.com/watch?v=xgZLXyqbYOc | Official trailer |
| KUNG FU PANDA 4 | https://www.youtube.com/watch?v=_inKs4eeHiI | Official trailer |
| HOW TO TRAIN YOUR DRAGON: THE HIDDEN WORLD | https://www.youtube.com/watch?v=SkcucKDrbOI | Official trailer |
| THE SUPER MARIO BROS. MOVIE | https://www.youtube.com/watch?v=TnGl01FkMMo | Official trailer |
| ABOMINABLE | https://www.youtube.com/watch?v=Ap0NRJD-2ts | Official trailer |
| THE FALL GUY | https://www.youtube.com/watch?v=j7jPnwVGdZ8 | Official trailer |
| 1917 | https://www.youtube.com/watch?v=gZjQROMAh_s | Official trailer |
| THE BAD GUYS | https://www.youtube.com/watch?v=zpDuBXB_glk | Official trailer 2 |
| NOPE | https://www.youtube.com/watch?v=In8fuzj3gck | Official trailer |
| TWISTERS | https://www.youtube.com/watch?v=wdok0rZdmx4 | Official trailer |
| FAST X | https://www.youtube.com/watch?v=aOb15GVFZxU | Official trailer 2 |
| M3GAN | https://www.youtube.com/watch?v=BRb4U99OU80 | Official trailer |
