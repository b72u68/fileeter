# Fileeter

> Have you ever been tired of some Leetcode pages that do not have filtering options
> and having to scroll to find the problems?

<p align="center">
  <img src="img/icon.png" width="30%" height="auto" />
</p>

## Overview

Fileeter provides filter by different difficulty levels and tags on some Leetcode
problem pages that do not have filter.

## Installation

Right now, I don't have plan to put this Chrome extension to the store
(because it is only for personal use, I don't know if other people also struggle
with the same problem). In order to use this extension, clone this repository
to your local machine.

```bash
git clone https://github.com/b72u68/fileeter
```

In your chromium browser, type `chrome://extensions` if you're using Google Chrome
(or `edge://extensions` if you're using Microsoft Edge like a psychopath) in
your address/search bar (or choose "Manage extensions" option in your Extensions
settings) and turn on "Developer mode" on the upper right corner of the page.

Next click on "Load unpacked" and choose the repository you have just cloned to
your local machine.

And done, you have installed this extension to your browser. Enjoy!

> **_NOTE_**: This extension does not support Firefox as this extension requires
> `manifest_version` 3 while add-ons in Firefox requires `manifest_version` <= 2.

## Features

### Theme

There are two available themes: Light (default) and Dark (to protect your weak
progammer's eyes). You can toggle between them by using the button on the top right.

### Filter by Difficulties

You can choose difficulty options "Easy", "Medium", and "Hard" and click "Apply"
to get a list of Leetcode problems with the chosen difficulty levels.

### Filter By Tag

You can choose problem tags from the dropdown menu and click "Apply" to get
a list of Leetcode problems with the chosen tags. CLick on the selected tag to
remove it from the filtering list.

## Development and Contribution

If you have new idea to improve this extension, you can either create new a "Issues"
ticket or fork and clone this repository to develop it in your environment.

Any suggestions and help would be appreciate.

## TODO

- [x] ~~Might need to add restriction that the extension can only be active on
      [https://leetcode.com/company/\*](https://leetcode/company) or it will go insane
      on other websites.~~

- [x] ~~Add filter by one tag feature.~~

- [x] ~~Add filter by multiple tags and improving popup interface to suport this feature.~~

- [x] Find out the right way to enable/disable extension in selected url.

- [ ] Hide/show completed problems.

- [ ] Refactor because popup.js looks disgusting

- [ ] Rewrite the whole thing in TypeScript and React instead of JavaScript?
