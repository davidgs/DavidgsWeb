---
title: "Handy Tools I Use"
description: "A bunch of handy tools for dealing with json, yaml, etc. in Golang"
date: 2021-04-08T17:18:53-04:00
hero: images/regex2.png
reading_time: 10 minutes
---

This started as a simple post to an internal Slack group. Then I got asked to post it to another channel in that Slack. Then I decided to post it to the [DevRel Collective](https://devrelcollective.fun) Slack. At which point I was asked to make it a blog post so it didn't get lost in the scroll-back (DevRel Collective uses a free Slack account, so we can only scroll back 10,000 messages. With 2,000+ members, that happens faster than you think. But I digress.)

## Why these tools
I do a *lot* of development in [Go](https://golang.org). I really never thought I would, but if you've read [this](/posts/catagory/programming/adventures-in-golang) or [this](/posts/category/programming/ok-so-test-driven-development-is-a-thing) or [this](/posts/category/camunda/letters-to-santan-autmotaing-joy-to-the-world-at-scale) you'll see that I've gotten sucked in. (Another brief digression. Yes, I've heard of Rust. It's the next language on my list. Give me a minute.)

Go has become my go-to language because I now know how to do stuff in it quickly. It's also easy to run cross-platform so I can develop on my Mac, and deploy on Linux and it Just Works™.

In most of my work with Go, I'm dealing with data in [`json`](https://json.org) and configuration files in [`yaml`](https://yaml.org) or [`toml`](https://toml.io) most of the time, so finding tools to make dealing with that data easier is always welcomed!

There's a bonus-tool at the end, if you read the whole thing.

## JSON First
In dealing with JSON, in Go, there are 3 common things I have to do all the time:
- Validate the JSON
- Unmarshall a JSON object into a Go structure
- Access a particular field in a JSON object

### Validate JSON
Validating the JSON is not always required, but it's usually a good idea. Nothing more frustrating that trying to deal with some JSON object only to find that what you're **trying** to deal with isn't actually proper JSON.

So I validate the JSON first using [jasonlint](https://jsonlint.com). Paste in your json object and it will immediately tell you if what you've got on your hands is, in fact, a valid JSON object.

### Unmarshall a JSON Object
Go has some rally handy ways to deal with JSON objects that make it my go-to for JSON Data. If you're given a JSON object, say from querying a website for data via an API, you can use

```go

  err := json.Unmarshal(data, &myStruct)

```
And the data will be unmarshalled into your data structure. But, and it's a big but, you have to have a datastructure that exactly matches your incoming data.

And that's where [json-to-go](https://mholt.github.io/json-to-go/) comes in. Take your validated JSON object, past it in on the left side, and out of the right side comes a valid Go data structure to hold it.

```json

  {
    "name": "David",
    "ParentEmailAddress": "spam@davidgs.com",
    "letter": "I want a pony",
    "address": {
      "home": "Not your business where I live",
      "work": "Also probably none of your business, but Camunda"
    }
  }

```
I've run that through the JSON linter, and it's valid. Great. Now, a Go Structure to hold it:

```go

  type Autogenerated struct {
    Name               string `json:"name"`
    Parentemailaddress string `json:"ParentEmailAddress"`
    Letter             string `json:"letter"`
    Address            struct {
      Home string `json:"home"`
      Work string `json:"work"`
    } `json:"address"`
  }

```
And now I can write some Go code:
```go

  import (
    "encoding/json"
    "log"
  )
  myStruct = Autogenerated{}
  data := getJsonData()
  err := json.Unmarshal(data, &myStruct)
  if err != nil {
    log.Fatal(err)
  }

```
And myStruct will be a properly filled out data structure with the data from my incoming JSON object.

Which brings me to the third thing I do: Accessing specific fields of a JSON object.

### Access a particular field of a JSON object
With our simple JSON structure above this wouldn't be a difficult problem for the most part. Want the work address?

```

  work_address = jsonObject.address.work

```
and you're there. But what if your JSON object is massively complicated?

```json

  {
    "status": "OK",
    "results": [
      {
        "geometry": {
          "location": {
            "lat": 37.4229181,
            "lng": -122.0854212
          },
          "viewport": {
            "northeast": {
              "lat": 37.4242670803,
              "lng": -122.08407222
            },
            "southwest": {
              "lat": 37.4215691197,
              "lng": -122.08677018
            }
          },
          "location_type": "ROOFTOP"
        },
        "address_components": [
          {
            "long_name": "1600",
            "short_name": "1600",
            "types": [
              "street_number"
            ]
          },
          {
            "long_name": "Amphitheatre Pkwy",
            "short_name": "Amphitheatre Pkwy",
            "types": [
              "route"
            ]
          },
          {
            "long_name": "Mountain View",
            "short_name": "Mountain View",
            "types": [
              "locality",
              "political"
            ]
          },
          {
            "long_name": "Santa Clara",
            "short_name": "Santa Clara",
            "types": [
              "administrative_area_level_2",
              "political"
            ]
          },
          {
            "long_name": "California",
            "short_name": "CA",
            "types": [
              "administrative_area_level_1",
              "political"
            ]
          },
          {
            "long_name": "United States",
            "short_name": "US",
            "types": [
              "country",
              "political"
            ]
          },
          {
            "long_name": "94043",
            "short_name": "94043",
            "types": [
              "postal_code"
            ]
          }
        ],
        "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
        "types": [
          "street_address"
        ]
      }
    ]
}

```

And that's not even complex in comparisson to some I deal with regularly, but for argument's sake, lets say it is. And let's say you want to get the second `type` out of the `address_component` that, in the above example, is the city, "Mountain View". Well, the `results` is actually an array, though in the above example it only has one element. If the array had lots of elements and you wanted the result of the 3rd item in the array, it gets a little harder.

This is where [json selector](http://jsonselector.com/process) comes in. Paste your JSON object in (that we already know is valid, because you validated it, *right*?) and then just click on what you want.

```go

['results'][0]['address_components'][2]['types'][1]

```

Oh heavens! There is is! It's the first element in the `results` array, it's the `address_components` field, and the third element in *that* array, and it's the second element of the `types` array!

Rememeber, array numbering starts at zero!

## A complete toolset
And that is a complete toolset for dealing with JSON object. But wait, I mentioned `yaml` and I haven't talked about it yet!

Correct! And thanks for paying attention!

### YAML
YAML: Yet Another Markup Language. Because what the world needs is more markup languages. But `yaml` is super useful for configuration files. I use yaml-based config files for all sorts of stuff. The configuration file for building this whole website is a `yaml` file.

So being able to properly parse and deal with a `yaml` file is important.

Again, with Go, it's relatively straighforward. My first tool is [yaml2go](https://yaml2go.prasadg.dev). Just like json-to-go, it will take your `yaml` file structure and turn it into Go data structures.

```yaml

  # Paste your yaml here...
  kind: test
  metadata:
    name: cluster
    namespace: test-ns
  ```
  And get yourself some spiffy Go code:
  ```go
  // MyYaml
  type MyYaml struct {
    Kind     string   `yaml:"kind"`
    Metadata Metadata `yaml:"metadata"`
  }

  // Metadata
  type Metadata struct {
    Name      string `yaml:"name"`
    Namespace string `yaml:"namespace"`
  }

```
And then you can unmarshall your config file:

```go

  import (
    "io/ioutil"
    "log"
    "gopkg.in/yaml.v2"
  )
  var config MyYaml
  // InitConfig reads the config file and sets up the config struct
  func InitConfig(){
    dat, err := ioutil.ReadFile("./config.yaml")
    if err != nil {
      log.Fatal("No startup file: ", err)
    }
    err = yaml.Unmarshal(dat, &config)
    if err != nil {
      log.Fatal(err)
    }
  }

```
And deal with your configuration variables from there. When you're done, if you want to write out your `config.yaml` file (you know, if your running program changed any startup parameters), you can write it all out after marshalling it:
```go

  import (
    "io/ioutil"
    "log"
    "gopkg.in/yaml.v2"
  )
  // WriteDictators outputs the entire config file
  func WriteConfig() {
    newConf, err := yaml.Marshal(config)
    if err != nil {
      log.Fatal(err)
    }
    err = ioutil.WriteFile("./config.yaml", newConf, 0644)
    if err != nil {
      panic(err)
    }
  }

```
You've now over-written your old config file with your new config file. It's essentially the same as JSON, just for `yaml`.

## Bonus tool time!
This one has saved my bacon on more than one occassion. Because I really, **really* suck at writing Regular Expressions (RegEx). Like, really. I"m terrible at it. So terrible at it that until I found this tooll I would write 30 lines of Go code to about a single call to a regex.

Not. Any. More!

Enter [RegEx101](https://regex101.com). I cannot even begin to say how brilliant this tool is. Let me explain.

You may (or may not) notice that this website is translated into a bunch of languages. I don't speak any of them. I don't write any of them. But I do write Go. So, using Go and google's translate APIs, I can automatically translate any post here into whatever language(s) I want.

But the translate API does some seriously messed up things with parts of a Markdown file. So I had to compensate. URLs are a great example. If my `blog-post.md` file has a link in it `[my link](https://my.link)` then Google Translate will happily translate `[my link]`, which I want, then add a space between `] (`, which I don't want, and then (sometimes) translate the path components of the link, which I defienitely **do not** want.

So I had to compensate, as I said. At first, I did this manually, and it was a real mess. It was error-prone and hard to maintain. But then I found [RexEx101](https://regex101.com) and everything changed.

I could do this:
![A regex that finds the url in the above paragraph](/posts/category/programming/handy-tools-i-use/images/regex1.png)

And then it even explains what the varoius parts of the regex do!

![explanation of what parts of the regex match](/posts/category/programming/handy-tools-i-use/images/regex2.png)

So then I can have my Go program find all the URLs in a given piece of text, and then after the text is translated, replace all the `] (messed/up/urls)` with `](original/url)`

```go

  // fix URLs because google translate changes [link](http://your.link) to
  // [link] (http://your.link) and it *also* will translate any path
  // components, thus breaking your URLs.
  reg := regexp.MustCompile(`]\([-a-zA-Z0-9@:%._\+~#=\/]{1,256}\)`)
  // get all the URLs with a single RegEx, keep them for later.
  var foundUrls [][]byte = reg.FindAll([]byte(xlate), -1)
  ...
  // translate the bit
  // Now it's time to go back and replace all the fucked up urls ...
  reg = regexp.MustCompile(`] \([-a-zA-Z0-9@:%._\+~#=\/ ]{1,256}\)`)
  for x := 0; x < len(foundUrls); x++ {
    tmp := reg.FindIndex([]byte(translated))
    if tmp == nil {
      break
    }
    t := []byte(translated)
    translated = fmt.Sprintf("%s(%s%s", string(t[0:tmp[0]+1]), string(foundUrls[x][2:]), (string(t[tmp[1]:])))
  }

```

I could also use it to find the other end:
![regex to find the messed up URLS](/posts/category/programming/handy-tools-i-use/images/regex3.png)

And it always helpfully explains what it's doing:

![explanation of how the regex matched various parts of the input text](/posts/category/programming/handy-tools-i-use/images/regex4.png)

Oh my! I could also fix the other stuff that Google Trnaslate messes up, like **bold** text `**bold**` becomes `** bold **` which isn't bold anymore. But with this:

```go

// a bunch of regexs to fix other broken stuff
	reg = regexp.MustCompile(` (\*\*) ([A-za-z0-9]+) (\*\*)`) // fix bolds (**foo**)
	translated = string(reg.ReplaceAll([]byte(translated), []byte(" $1$2$3")))
	reg = regexp.MustCompile(`&quot;`) // fix escaped quotes
	translated = string(reg.ReplaceAll([]byte(translated), []byte("\"")))
	reg = regexp.MustCompile(`&gt;`) //fix >
	translated = string(reg.ReplaceAll([]byte(translated), []byte(">")))
	reg = regexp.MustCompile(`&lt;`) // fix <
	translated = string(reg.ReplaceAll([]byte(translated), []byte("<")))
	reg = regexp.MustCompile(`&#39;`) // fix '
	translated = string(reg.ReplaceAll([]byte(translated), []byte("'")))
	reg = regexp.MustCompile(` (\*) ([A-za-z0-9]+) (\*)`) // fix underline (*foo*)
	translated = string(reg.ReplaceAll([]byte(translated), []byte("$1$2$3")))

  ```
  Brilliant. Becaues I **never** would have been able to write those Regular Expressions without serious help!

  ## Conclusion
  I hope you found these tools as helpful as I do. I really do use them on a near-daily basis for the work I do. I have them pinned as tabs in my browser so they are always open and easy to find.

  If you know of other tools, please do let me know! And don't forget to [follow me](https://twitter.com/intent/follow?screen_name=davidgsIoT) on Twitter!
