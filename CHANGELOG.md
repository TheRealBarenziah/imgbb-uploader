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
