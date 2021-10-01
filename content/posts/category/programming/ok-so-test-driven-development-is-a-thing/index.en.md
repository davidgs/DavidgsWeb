---
title: "Ok, So Test-Driven Development is a Thing"
Date: 2021-04-06
Author: davidgs
Description: Where I admit what a crappy developer I've been, and how I'm trying to get better. 
Category: Programming
Slug: ok-so-test-driven-development-is-a-thing
hero: images/test-driven-development-TDD.jpg
reading_time: 5 minutes
---

I get it, I'm late to the party on this one. I'm old, I'm set in my ways, and I don't like change. Get over it.

## Chasing a Bug
I was developing a Slack-bot for the [DevRelCollective](https://deverelcollective.fun) and I had it _almost_ working.

Well, to be fair, I had it working for a while, then I broke something.

![Letterkenny To Be Fair animated gif](images/fair.gif)

And then I was trying to fix what I broke, and all hell broke loose.

## Off-by-One
The saying I got from my [mom](https://www.researchgate.net/scientific-contributions/Margaret-L-Simmons-34878680) is:
> There are only 2 hard problems in computer science: Cache invalidation, naming things, and off-by-one-errors.
And I was in off-by-one hell. Admittedly a hell of my own making, but hell nonetheless.

Every time I thought I had found it, it popped up somewhere else. And it was somewhere in the ~750 lines of Golang code I'd managed to write. I could not find it and I was losing (what's left of) my mind!

## OK, let's try a simple test
In utter desperation, I decided that I should just write some tests to see if I could find it. I was desperate and willing to try anything!

Luckily, Golang has a fully-developed and relatively easy testing interface, so I decided to give it a try. I started with a relatively simple function that I was pretty sure I could write a test for:

```go
func checkHeader(key string, data string) bool { // Test Written
	// Create a new HMAC by defining the hash type and the key (as byte array)
	h := hmac.New(sha256.New, []byte(config.SlackSecret))
	// Write Data to it
	h.Write([]byte(data))
	// Get result and encode as hexadecimal string
	sha := hex.EncodeToString(h.Sum(nil))
	comp := fmt.Sprintf("v0=%s", sha)
	return comp == key
}
```
All Slack messages are `signed` with a hex-string of a sha-256 hash. Calculate that, compare it to what Slack sent, and you know if your message is authentic. Easy and effective way to keep hostile messages out, as long as you keep your `secret` actually secret.

So let's test this thing. First thing to do is create a new Go file. If your program is called `SlackBot.go` then you would create `SlackBot_test.go`. And `import` the testing framework along with any other libraries you will rely on.

```go

import (
  "testing"
  "fmt"
  "crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
)

func TestCheckHeader(t *testing.T) {
	init_config()
	h := hmac.New(sha256.New, []byte(config.SlackSecret))
	h.Write([]byte(ConfigString))
	sha := hex.EncodeToString(h.Sum(nil))
	input := fmt.Sprintf("v0=%s", sha)
	result := checkHeader(input, ConfigString)
	if !result {
		t.Errorf("checkHeader Failed got %v", result)
	}
}
```
You then create a function called `Testxxxx` where `xxxx` is the name of the function you will be testing.

In the above example, my Slack Secret is stored, along with a bunch of other configuration stuff, in a `config.yaml` file, so I needed a short function (`init_config()`) to read that configuration data in and get everything set up.

I then calculate the Header Checksum, and then get the `checkHeader()` function to calculate it. They should match, or the test fails.

## Let's try some more
That initial test was a success, and I began to see how making sure that each function was performing as expected. So I started writing more.

Let's just say I found way more bugs than the off-by-one bug I was chasing. Each time I'd write a test and run it, I'd find something that the function I was testing was doing slightly wrong, so I'd go fix it until the test passed.

It took a few hours to write tests for each function, and a few more to correct the errors I was finding, but then ...

![An Aha moment with a light bulb going off](images/Aha.jpg)

Had I started out this way, I would have saved myself a ton of time and frustration!

## That off-by-one error
As it turns out, there were multiple off-by-one errors due in large part to my numbering scheme. In the configuration file I listed:

```yaml
Authorized Users:
  - name: David Simmons
  - username: davidgs
  - order: 1
```
For the first person in the rotation. But then, as we know, array/slice numbering starts at zero. So I was compensating for that in most places, but not all, and it was manifesting itself in very odd and hard-to-find ways.

As soon as I started testing each function on at a time I could see where some were returning `1` for the first person, and others were returning `0`. More importantly, it turns out, was that I was using `len(slice)` to determine length, and get the last item in the slice.

I had 4 people in the slice. Numbered 1-4. But I never went to get `slice[4]` because that's not the last item. That's off the end by one, and you get a `panic()` when you do that. So I wasn't doing that. But ... well, maybe you can see the error of my ways. I was never actually getting to `slice[3]` (the end of the slice), and sometimes I wasn't even getting to `slice[0]`.

The testing found all of that quickly and allowed me to fix it all.

## Testing all the things!
This has, of course, lead me to the conclusions that I've been doing it wrong all these many years. And that I should go back and write Unit Tests for everything I've ever written in all of history.

I"m not going to do that.

What I **am** going to do, of course, is write and use tests for all the stuff I'm *currently* working on, and I'll be writing tests for absolutely everything I write in the future.

I'm assuming this will save me tons of time and frustration and, should my hair ever grow back, gray hairs.

I'm a convert.
