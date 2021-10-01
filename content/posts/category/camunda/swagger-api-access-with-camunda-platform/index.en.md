---
title: "Swagger API access with Camunda Platform"
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
reading_time: 5 minutes
---

Have you ever fired up the Camunda Platform Docker instance and wished you could do live-calls to the API via a [swagger server](https://swagger.io)? We have! And like most things we wish we could do, we go out and make it happen.

## Coming Soon

To be clear, this integration is coming to the official Camunda Platform Docker container with release 7.15. It's just not ready yet. So this is really more of an interim solution rather than the be-all and end-all solution, but it works, and it makes sending API calls to a live instance of Camunda Platform a *lot* easier. So follow along and we'll show you how to run it yourself.

## CORS is your friend, and not your friend

In general, and on the regular internet, Cross Origin Resource Sharing (CORS) keeps you safe by not loading resources from random, untrusted sources. This is generally a good thing. Until it isn't.

When isn't it? When you want to do something like make API calls from one host to another when the 2 hosts don't have an explicit trust agreement. Like between 2 Docker containers. Or between your laptop and a Docker container.

Yes, you can go in and set a header in the HTTP server such that `Access-Control-Allow-Origin: *` and that will solve the problem (while creating a host of other problems). But when you're dealing with a pre-built Docker container that runs a service via tomcat, it's never quite that simple.

## How this works

We decided that, given the above CORS issue, the simplest way to tackle the whole thing was to add an nginx proxy server to the existing Docker container. That way you can have everything run in one container, and not have to worry about CORS at all.

We made no changes to the underlying Camunda Platform instance to make this work. That instance is still accessible via the Docker container's port 8080.

What We did was add the swagger server on port 8081 within that same Docker container.

And now you're thinking "but that doesn't solve the CORS issue!" and you're right, it doesn't. If you go to the swagger instance on port 8081 (if you export that port when you start the Docker container) you will get the swagger server and see the APIs. But if you try to execute any of those API calls, you will quickly see the impact of CORS. Your API calls will all fail.

![Screenshot showing the API server on port 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Enter nginx. Nginx is a very small, super lightweight web server that is configurable to act as a proxy. I set it up to listen on port 8000 of the Docker container, and to proxy calls based on the URL. point your browser at http://docker-container:8000/docs and nginx will forward that call to port 8081, where the swagger server lives. Point your browser to http://docker-container:8000/camunda and you will be redirected to the standard Camunda Platform Task Manager, Cockpit, etc.

You will need to change the port in the swagger server to port 8000 from port 8080:

![Screenshot showing using port 8000](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## Making API Calls

Why is all this even necessary? Well, if you've ever wanted to try out API calls, to a live server, and get actual results, then swagger is your friend.

Swagger lets you make live API calls against a running server instance, and get real results back!

![screenshot of live API call](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Sure, you could write some code to test each API call, but if you'd like to reduce your development time, using a live API server like swagger is definitely the way to go.

If you want to see exactly what's being returned as a payload from a given API call, swagger is also your friend:

![Results of a live API call](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

As you can see, you get the complete `curl` command you could use, the returned data, which you can then use to make sure your program can properly handle the returned message, as well as the complete response headers.

## How can you get this?

Again, to repeat, this is currently *not* part of the official Camunda Platform Docker image. It will be coming with the release of 7.15, but it's not right now.

That being said, you can still get access to it, and use it.

First, you will need to clone the proper repository which is [here](https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger). That is a clone of the official Camunda Platform Docker repository, and a special `swagger` branch.

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
should do it for you.

Now you'll need to build that into a proper Docker image. This can take some time as all the components are downloaded.

```
% cd docker-camunda-bpm-platform
docker-camunda-bpm-platform % git status
On branch swagger
Your branch is up to date with 'camunda-community-hub/swagger'.

nothing to commit, working tree clean
% (base) davidgs@MacBook-Pro docker-camunda-bpm-platform % docker build . --rm -t camunda-bpm-plaform:swagger
Successfully built db270d32507f
Successfully tagged camunda-bpm-platform:swagger
%  docker-camunda-bpm-platform % Docker image list
REPOSITORY                     TAG       IMAGE ID       CREATED         SIZE
camunda-bpm-platform           swagger   db270d32507f   5 seconds ago   333MB
```
So it's now built. You have the image ready to go. All that's left is to run it!

```
% docker run -p 8000:8000 db270d32507f
```

It should take about 30-45 seconds to start everything up, but you can then point your browser to [http://localhost:8000/docs](http://localhost:8000/docs) for the swagger server, or [http://localhost:8000/camunda](http://localhost:8000/camunda) for the Camunda Platform.

You can use Camunda Modeler to deploy and run models by changing the deployment port from `8080` to `80000`

![Camunda Modeler deployment](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

And you're all done!