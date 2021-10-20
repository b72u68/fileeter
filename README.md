# Fileeter

> Have you ever been tired of some Leetcode problem pages not having filter
> and having to scroll to find the roblems? Well say no more.

<p align="center">
  <img src="img/icon.png" width="30%" height="auto" />
</p>

## Overview

Fileeter provides filter problems by different difficulty levels and tag on some
Leetcode problem pages that do not have filter.

## Installation

Right now, I don't have plan to put this Chrome extension to the store
(because it is only for personal use, I don't know if other people also struggle
with the same problem). In order to use this extension, clone this repository
to your local machine.

```bash
git clone https://github.com/b72u68/fileeter
```

In your chromium browser, type `chrome://extensions` to your URL bar (or choose
"Manage extensions" option in your Extensions menu) and turn on "Developer mode"
on the upper right corner of the page.

Next click on "Load unpacked" and choose the repository you have just cloned to
your local machine.

And done, you have installed this extension to your browser. Enjoy!

## Features

### Theme

There are two available themes: Light and Dark. You can toggle them by using the
button on the top right.

### Filter by Difficulties

You can choose the difficulty options "Easy", "Medium", and "Hard" and click "Apply"
to get a list of Leetcode problems with the chosen difficulty level(s).

### Filter By Tag

You can choose one problem tag from the dropdown menu and click "Apply" to get
a list of Leetcode problems with the chosen tag.

## Development and Contribution

If you have new idea to improve this extension, you can either create new a "Issues"
ticket or fork and clone this repository to develop it in your environment.

Any suggestions and help would be appreciate.

## TODO

- [x] ~~Might need to add restriction that the extension can only be active on
      [https://leetcode.com/company/\*](https://leetcode/company) or it will go insane
      on other websites.~~

- [x] ~~Add filter by one tag feature.~~

- [ ] Add filter by multiple tags and improving popup interface to suport this
      feature.
