# 1.5.1

- Fixes [The program crashes when the server is offline](https://github.com/TheRealBarenziah/imgbb-uploader/issues/36) thanks to [majwadalam's PR](https://github.com/TheRealBarenziah/imgbb-uploader/pull/37)

- Fix the CI: I updated randomImageUrl() to use [random.responsiveimages.io](https://random.responsiveimages.io/) since the [picsum.photos](https://picsum.photos/) version was too annoying to work with (agressive Cloudfare protections made the HTTP request return 'This website is using a security service to protect itself from online attacks' to my modest 3 requests, basically breaking the CI).

# 1.5.0

### ESM support 🚀

While trying to utilise the initial version of [phraze](https://www.npmjs.com/package/phraze) module, a sudden realization shocked me. There are people out there who are writing pure ESM nodejs projects, and they do it as it is the most natural thing to do !!!

Despite having fairly painful memories of the UMD (_universal_ module definition) / AMD (_asyncronous_ module definition) / ESM (_EcmaScript_ Modules) / CJS (_CommonJS_) jungle, I tried to give it another go.  
Long story short, it's still far from obvious, but now things are a bit simpler that they once were. ESM seem to have won [the heart of the many](https://nodejs.org/api/esm.html) (in the frontend, it had mine already), on top of being [anointed by the holy tc39](https://tc39.es/ecma262/#sec-modules) by definition.

The main difficulties I've encountered while working on ESM support were:

- TS being bitchy about the export syntax. To be able to keep the "require" syntax everyone loves, I had to use [a little hack](https://www.npmjs.com/package/export-helper)
- Tests duplication. There was no way I'd rewrite & maintain 30+ more tests. So I made [an utility](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/src/__tests__/codegen.js) that write those tests for me, and that was **very fun**! 10/10 would write JS with JS again  
  For the record, this is the 3rd iteration; before that I had a sweet (but hard to maintain) AWK version, then a glitchy [awk-in-js](https://www.npmjs.com/package/awkjs) one.
- [jest experimental ESM support](https://jestjs.io/docs/ecmascript-modules). Had several back & forth with babel & ts-jest configs before having a working setup. Fortunately, the size of Jest community, and the quality of it's issue contributors, made it so I could find a working setup without having to dive into their source code. Thanks guys !

### Ditch remap-istanbul

GitHub was very annoying flagging me for security issues about this thing absolutely no one interacts with besides me, but yeah. While I had to update Jest to support ESM, I took the chance to ditch it, and generate the coverage report with Jest. Cya remap-istanbul! 👋

# 1.4.0

- Closes [Support chevereto issue](https://github.com/TheRealBarenziah/imgbb-uploader/issues/14) after more than eight months.

Sorry for the wait! It was partially caused by a massive amount of [yak shaving](https://xkcd.com/1739/) around Chevereto CI, like, writing a pure Docker stack, then switching to handmade docker-compose, then to remotely-hosted K(uwu)bernetes stack, all while knowing overall little about Docker & nothing about K(uwu)be

_"TDD is a time gain, not a time loss"_, they said !!!

Well, maybe it's not wrong in the end. Afterall the back and forth allowed me to learn important things about TLS and networks and stuff. And there's no debate about the future developments/bugfixes being made easier!

Some other things that took time was hesitating on [the interface](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/USE_WITH_CHEVERETO.md). In the end I opted for something that felt balanced between TypeScript constraints, flexibility and ease of use.  
I hope Chevereto users will like it, whatever the version they're using! Either way I'm all ears for feedback.

- Switch from Travis CI to Github Actions

[Travis CI today](https://travis-ci.community/t/org-com-migration-unexpectedly-comes-with-a-plan-change-for-oss-what-exactly-is-the-new-deal/10567) is far from the one I once knew and loved. No hard feelings, but I have to move away to a more OSS-friendly solution. I went with GitHub Actions. For my limited usage it feels like the old Travis: a free, easy to setup, pleasant to use automation solution.  
Maybe one day I'll also automate the `npm publish` stuff with it, seems simple enough.

# 1.3.5

- Remove useless dependencies  
  I don't know how eslint stuff came here oO

# 1.3.4

- [Better error handling](https://github.com/TheRealBarenziah/imgbb-uploader/commit/a08fad99dec39dcee2a577811ef3ceaa62db8359#diff-2ce46d3aedfeb3b3e2c3260ad7f46386bd25c882fa92612957168baa38f22d26R55)  
  [This issue](https://github.com/TheRealBarenziah/imgbb-uploader/issues/18) made me realize how wrong was my error handling. Now checking for `response.error` and returning it if defined. No more "faulty payload" generic (& incorrect) error for imgBB API-related errors (like 'file too big' or 'invalid API key')!

- Small fix: passing non-number to `expiration` param should throw a proper Error

- Chore: `npm audit fix` to please secoority bots, even if I'm the only one concerned by devDeps and even if nothing had any chance of happening ^o^

- Run tests in parallel: `npm run dev` run was too long  
  To achieve concurrency I took the easy route of splitting the test suite into separate files. It's not DRY, not very clean (and GitHub will shame me by displaying more JavaScript % than TS) but I read enough bad stuff about [Jest test.concurrent](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) to prefer the reliable (and easy) route for now.  
  `npm run dev` is still longer than ever thanks to absolutely inefficient `src/__tests__/require/bigFileExplicitThrow.js` relying on [monkey-developed (thats harsh on monkeys) dependency](https://github.com/TheRealBarenziah/waifu-generator/blob/senpai/mosaic.js#L37), but I don't mind since the output of other tests comes faster.

- Next milestones are: minimizing bundle size, and [supporting chevereto-based APIs](https://github.com/TheRealBarenziah/imgbb-uploader/issues/14), hopefully before 2022 !

# 1.3.3

- [Add encodeURIComponent](https://github.com/TheRealBarenziah/imgbb-uploader/issues/10) on the `name` that is passed. This revealed the weird transformations imgBB API could make on passed name. A future version will come to better check the compability of passed `name` with imgBB, and either warn or reject in case the exact `name` can't be accepted as is by imgBB.

- [Feat: passing an image URL is now feasible](https://github.com/TheRealBarenziah/imgbb-uploader/issues/11) as it should !

- [Chore: fileToString func now calls fs.promises.readFile instead of wrapping fs.readFile into a Promise](https://github.com/TheRealBarenziah/imgbb-uploader/commit/ee6e6abc2b6af08313f44b9b4e6a2f74aa53dd77): afaik it won't change the behaviour in the end, it's just more readable that way, & makes the async nature of that operation even more obvious (reminder: [the syncronous fs.readFile call blocks the holy Event Loop 'til it is complete](https://nodejs.org/api/fs.html#fs_synchronous_example))

- TODO: continue the UX work that has been started. This implies, amongst other things, making extra sure (writing a test for it?) that the ResponseObject interface is easily accessible; update the "compatibility" section (I'm transpiling to es5 atm); better input validations (imageUrl regex, name parsing...); audit performance (could it be improved further)

# 1.3.2

- [Patch responseObject interface](https://github.com/TheRealBarenziah/imgbb-uploader/pull/9#issuecomment-860906935)  
  Fix the interface for medium key & update README for that matter.

- [Update devDependencies](https://github.com/TheRealBarenziah/imgbb-uploader/commit/5a196ea5d58e5fe654d1dee693c7267fbb75476f)
  For sport, I tried to please `npm audit` & GitHub dependabot for dev deps. Fixing the bothering [RCE](https://snyk.io/vuln/SNYK-JS-HANDLEBARS-1056767) vulnerability [took a `remap-istanbul` fork](https://github.com/TheRealBarenziah/remap-istanbul/commit/f8a107f7aba3b5224011ffa3d353d5e6c2360a8b) since their repo last commit is 3 years ago.

- One day tho, I should setup a proper Istanbul CC setup & take the opportunity to replace `tslint` by `typescript-eslint` since the former [is deprecated since 2019](https://github.com/palantir/tslint/issues/4534).

# 1.3.1

- [Updated responseObject interface](https://github.com/TheRealBarenziah/imgbb-uploader/pull/9)  
  Thanks for PR :)

- While being at it, I had some fun with code coverage, tweaked some `package.json` scripts and gave a cleaner name to "rebuild.js".  
   Intrigued about it, I tried Jest's built-in coverage report, but it pointed to ugly, transpiled JS. Saw two ways to fix this: a parallel Istanbul setup to handle it, or hacking around to make it work with Jest built-in tool. For funsies I took the latter route using [remap-istanbul](https://www.npmjs.com/package/remap-istanbul).  
   Their readme says: `We strongly encourage developers to leverage IstanbulJS, and only use this package (remap-istanbul) when needing to support legacy versions of Istanbul.`  
   In my case, it seem the Istanbul version in Jest's depencency graph is 0.x, so I opted to use their module for now and leave in-depth Istanbul for later.  
   Note: node kept complaning about undefined "VERSION" and circular dependency while running `npm run remap`, so I ended using `--no-warnings` flag for it. If curious, feel free to make it `--trace-warnings` in `package.json` ;).
  In the end, it allows to generate two HTML coverage reports after a test pass, one for transpiled code (`./coverage/lcov-report`), one for source (`./coverage/ts-report`).

  - Increased code coverage: 98.46% statements covered. Tests will never enter the ".on('error', () => )" callback in the POST function, but I'll feel safer leaving that block. It's not like it's hurting anybody anyway ^o^

  - Updated [CONTRIBUTING](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/CONTRIBUTING.md) to reflect that.

# 1.3.0

Issue #6 brought an interesting feature idea. Took a bit of time because I first had to adapt the module used by the tests (waifu-generator owo).

Everything seem to work as intended.

Took the opportunity to reduce insanity within test code. Not perfect, but still less horrible than before.

Finally, I'm abandoning the idea of making this frontend-compatible some day. I don't want to endorse terrorism, and it's definitely not reasonable to encourage people to throw API keys into their frontends (even free API key - remember this module will stop working the day imgBB stop providing their service).

What I could do, aside writing this in the README, is perhaps redirecting to a working HTML/JS or React snippet, so people looking for a quick solution without any regard for security (for POC/hackathon/pet project) could gain some time.

# 1.2.0

While issues #3 and #4 were closed by users, they still needed to be adressed.

It's now possible to pass 'expiration' and 'name' params to imgBB API through an options object.

Also, the design of the test was terribly, terribly wrong (I always upload the same file, but imgBB API, by checksum or something, is able to tell, thus always returns my original upload as response. I didn't noticed until toying with name & expiration params, but the test were little more than dead code).

Fixed by making each test generate a random image (wrote another module for that), enabling proper testing for the new option object, & overall increased sanity.

Took the opportunity to write a few more tests; not nearly as rigorous as they should be, but still better than the imgBB API ping of old.

# 1.1.0

Module overhaul:  
Seeing some people found this module useful made me glad, so I decided to give it some love.

- Becomes dependency-free  
  The respectable `request` module was the only external dependency, but now that's unsupported, as `npm install` spams everytime, it's problematic.  
  While I could have replaced it with Axios, I preferred reinventing that wheel using standard node `https`. It should hold for the years to come.

- TypeScript support  
  TypeScript is all the rage and I'm still in the process of learning it. That's why I thought it was interesting to make this module TS compatible, **without breaking compatibility** for the `require();` users.

- Better integration for VSCode  
  I've discovered JSDoc since then. It should benefit even non-TypeScript users.

- Change code style
  I have semi colons everywhere except in this little module. Fixed that. Long live semi colons :)

- Upgraded file architecture & CI  
  [This is the resource](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c) that guided me through the TS/Jest stack, it was an interesting adventure.  
  I made my best to ensure this update won't break anything for you, but if it is the case, please open an issue :)

Todo:  
Write more in CONTRIBUTING.md so this module remains easy to fork & tweak. It may look more bloated than before, but I'm convinced decent documentation should fix it.

Making .mjs import work. Hopefully soon  
Supporting browsers (afterall why not)  
Supporting passing filename parameter  
Supporting arrays (in the very bottom of the list tbh)

# 1.0.1

Fix README

# 1.0.0

Replace `var` and `function` with proper ES6 syntax & update README
