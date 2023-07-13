# Notepad

Browser based notepad. Based on something I found somewhere around the internet.

Features:

- Create, edit, delete notes on the fly
- Save notes to local storage
- Restore notes from local storage when opening new window

That's it.

## Known Issues

- Works on mobile when there is text
- User has to know to tap into the frame

## Development

~~Edit `index.html`. Open `index.html` in browser.~~

Used to be easy, but as soon as you want some type checking and other goodies, you need to use a build tool.

```bash
npm ci
npm run dev
```

## Tests:

```bash
npm run test
```

## Todo

- Wait until this works on mobile (Webkit I'm looking at you). https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard_API
- maybe make it use the body again?

## Deployment

~~Copy `index.html` to your web server. Browse to `index.html`.~~

```bash
npm run build
```

Copy `dist/**/*` to your web server. Browse to `/index.html`.

## License

MIT
