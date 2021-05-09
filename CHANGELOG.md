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
